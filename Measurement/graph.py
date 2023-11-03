import pandas as pd
import matplotlib.pyplot as plt
import os

# Define the list of CSV file names
csv_files = [
    "Measurement\\Data\\angular_performance_results.csv",
    "Measurement\\Data\\blazor_performance_results.csv",
    "Measurement\\Data\\react_performance_results.csv",
    "Measurement\\Data\\vue_performance_results.csv"
]

# Initialize empty DataFrames to store data from each CSV file
data_frames = []

# Read and store data from each CSV file
for csv_file in csv_files:
    data = pd.read_csv(csv_file)
    data_frames.append(data)

# Create a line plot for memory usage over time
plt.figure(figsize=(12, 6))
for i, data in enumerate(data_frames):
    framework_name = os.path.splitext(os.path.basename(csv_files[i]))[0].split('_')[0].capitalize()
    plt.plot(data['Time (s)'], data['Memory Usage (MB)'], label=framework_name)

plt.xlabel('Time (s)')
plt.ylabel('Memory Usage (MB)')
plt.title('Memory Usage Over Time')
plt.legend()
plt.grid()
plt.savefig('Measurement\\Data\\memory_usage_over_time.png')  # Save the memory usage plot as an image

# Calculate and create a bar chart for average frame rate
average_frame_rates = [data['Frame Rate (FPS)'].mean() for data in data_frames]
plt.figure(figsize=(8, 6))
framework_names = [os.path.splitext(os.path.basename(csv))[0].split('_')[0].capitalize() for csv in csv_files]
plt.bar(framework_names, average_frame_rates)
plt.xlabel('Framework')
plt.ylabel('Average Frame Rate (FPS)')
plt.title('Average Frame Rate Comparison')
plt.savefig('Measurement\\Data\\average_frame_rate_comparison.png')  # Save the average frame rate comparison as an image
