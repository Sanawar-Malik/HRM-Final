import cv2
import time

# Set up the IP camera URL (example format: "http://<ip-address>/video")
ip_camera_url = "rtsp://admin:@3Zl*$nRa@192.168.15.95:554/cam/realmonitor?channel=1&subtype=0"

# Create a VideoCapture object
cap = cv2.VideoCapture(ip_camera_url)

# Check if the connection to the camera was successful
if not cap.isOpened():
    print("Error: Could not open video stream from IP camera.")
    exit()

# Get the actual resolution of the video feed
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Set the desired frame rate
desired_fps = 12
frame_duration = 1 / desired_fps

# Define the codec and create VideoWriter object with 12 FPS
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, desired_fps, (frame_width, frame_height))

# Get the start time
start_time = time.time()

# Capture video for one minute
while int(time.time() - start_time) < 60:
    loop_start_time = time.time()  # Track the start of each loop
    
    # Capture frame-by-frame
    ret, frame = cap.read()
    
    if ret:
        # Write the frame to the output file
        out.write(frame)
    else:
        print("Error: Could not read frame.")
        break

    # Wait to maintain 12 FPS
    elapsed_time = time.time() - loop_start_time
    if elapsed_time < frame_duration:
        time.sleep(frame_duration - elapsed_time)

# Release everything
cap.release()
out.release()
