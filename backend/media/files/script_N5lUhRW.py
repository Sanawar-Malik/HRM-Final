 
#!/usr/bin/env python3 
#-*- coding: utf-8 -*- 
  
import subprocess 
  
def sendmessage(message="drink water"): 
    subprocess.Popen(['notify-send', message]) 
    return
  
if __name__ == '__main__': 
    sendmessage()
    
    
    
    
    
    
class speedViolationAlertsGenerateRequestHandler(BaseHandler):
    async def get(self):
        iotUser = "pi"
        file_path = "/home/galaxy/Movinwheels-Server/road_data.geojson"

        try:
            if os.path.exists(file_path):
                with open(file_path, 'r') as f:
                    geojson_data = json.load(f)

                # Process the GeoJSON data as needed
                road_segments = []
                for feature in geojson_data.get('features', []):
                    if feature.get('properties') and feature['properties'].get('speed_limit') is not None:
                        coords = feature['geometry'].get('coordinates')
                        if coords and len(coords) >= 2:
                            # GeoJSON coordinates are [lon, lat]
                            lon, lat = coords[0], coords[1]
                            road_segments.append({
                                'feature': feature,
                                'speed_limit': feature['properties'].get('speed_limit', 0),
                                'highway': feature['properties'].get('highway'),
                                'lat': lat,
                                'lon': lon,
                            })
                hubId = getHubId(iotUser)
                if hubId:
                    hubid = hubId.decode("utf-8")

                truckid, url = await getTruckIdByHubIdFromPSQL(self, hubid)
                filename = MAP_FILE_LOCATION + "%s.txt" % truckid
                tries = 0
                data = None
                if os.path.exists(filename):
                    while tries < 3:
                        try:
                            with open(filename, "r") as fs:
                                data = json.load(fs)
                                tries = 3
                        except IOError as ex:
                            print(ex)
                            tries += 1
                            sleep(1)
                if data:
                    truck_lat = data["lat"]
                    truck_lon = data["lon"]
                    gps_date = data["gps_date"]
                    gps_time = data["gps_time"]
                    truckid = truckid
                    ts = await self.convertIntoTimeStamp(gps_date, gps_time)
                    truck_speed = str(data["gps_speed"]) + ' km/h'

                result = await self.check_speed_limit(truck_lat, truck_lon, truck_speed, road_segments, truckid, hubid, url, ts)
                print(result)
        except Exception as e:
            print(f"An error occurred: {e}")

    async def check_speed_limit(self, truck_lat, truck_lon, truck_speed, road_segments, truckid, hubid, url, ts):
        try:
            closest_limit = await self.get_actual_road_speed_limit(truck_lat, truck_lon, road_segments)

            if closest_limit is not None and truck_speed > closest_limit:
                return await self.generate_speed_alert(truck_speed, closest_limit, truckid, hubid, url, ts)
            return 'Speed is within the limit'
        except Exception as e:
            print(f"An error occurred in check_speed_limit: {e}")

    async def get_actual_road_speed_limit(self, lat, lon, road_segments):
        try:
            truck_point = Point(lon, lat)  # Shapely uses (lon, lat)
            actual_segment = None
            min_distance = float('inf')

            for segment in road_segments:
                coordinates = segment['feature']['geometry']['coordinates']
                if len(coordinates) >= 2:
                    line = LineString(coordinates)
                    distance = truck_point.distance(line)
                    if distance < min_distance:
                        min_distance = distance
                        actual_segment = segment
                else:
                    print("Invalid coordinates for segment:", segment)

            if actual_segment:
                return actual_segment['speed_limit']
            return None
        except Exception as e:
            print(f"An error occurred in get_actual_road_speed_limit: {e}")

    async def generate_speed_alert(self, truck_speed, speed_limit, truckid, hubid, url, ts):
        try:
            alert_message = f'Alert: Speeding! Maxspeed: {speed_limit}, Truck speed: {truck_speed}'
            alert = await getTruckLatestAlertToBeSyncd(self, truckid)
            if alert is None or not alert:
                inputdata = {
                    "event": "Over_Speed",
                    "hubid": hubid,
                    "ts": ts,
                }
                file_name = f"{inputdata['event']}-{inputdata['ts']}-{inputdata['hubid']}.txt"
                # print("No Data in Sync Alert Table", file_name)
                moveFileToEventsFolderTruck(url, file_name, inputdata, iotUser="pi")
            else:
                alert_ts = alert['ts']
                alert_time = datetime.fromtimestamp(alert_ts)
                truck_ts = datetime.fromtimestamp(ts)

                if (truck_ts - alert_time) > timedelta(hours=6):
                    inputdata = {
                        "event": "Over_Speed",
                        "hubid": hubid,
                        "ts": ts,
                    }
                    file_name = f"{inputdata['event']}-{inputdata['ts']}-{inputdata['hubid']}.txt"
                    # print("filename", file_name)
                    moveFileToEventsFolderTruck(url, file_name, inputdata, iotUser="pi")
            return alert_message
        except Exception as e:
            print(f"An error occurred in generate_speed_alert: {e}")

    async def convertIntoTimeStamp(self, gps_date, gps_time):
        try:
            if len(gps_time) < 8:
                gps_time = "0" * (8 - len(gps_time)) + gps_time

            if len(gps_date) < 6:
                gps_date = "0" * (6 - len(gps_date)) + gps_date

            formatted_gps_date = f"{gps_date[4:6]}{gps_date[2:4]}{gps_date[:2]}"

            if len(formatted_gps_date) == 6:
                formatted_gps_date = "20" + formatted_gps_date

            gps_datetime_str = (f"{formatted_gps_date} {gps_time[:2]}:{gps_time[2:4]}:{gps_time[4:6]}")

            gps_datetime = datetime.strptime(gps_datetime_str, "%Y%m%d %H:%M:%S")

            # Convert datetime to epoch timestamp in UTC
            epoch_timestamp = int(gps_datetime.replace(tzinfo=timezone.utc).timestamp())
            return epoch_timestamp
        except Exception as e:
            print(f"An error occurred in convertIntoTimeStamp: {e}")
 


