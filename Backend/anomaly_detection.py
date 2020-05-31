import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data
from ucsd_dataset import UCSDAnomalyDataset
from video_CAE import VideoAutoencoderLSTM
import torch.backends.cudnn as cudnn
import numpy as np
#matplotlib notebook
import matplotlib.pyplot as plt
from flask import Flask,jsonify,request 
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


model = VideoAutoencoderLSTM()
model.load_state_dict(torch.load('checkpoint.epoch.2.2.pth.tar')['state_dict'])
model.set_cuda()
model=model.eval()  

test_ds = UCSDAnomalyDataset('Test')
test_dl = data.DataLoader(test_ds, batch_size=8, shuffle=False)

frames = []
errors = []
for batch_idx, x in enumerate(test_dl):
    # print("hi")
    y = model(x.cuda())
    mse = torch.norm(x.cpu().data.view(x.size(0),-1) - y.cpu().data.view(y.size(0),-1), dim=1)
    errors.append(mse)
errors = torch.cat(errors).numpy()

errors = errors.reshape(-1, 191)
s = np.zeros((2,191))
s[0,:] = 1 - (errors[0,:] - np.min(errors[0,:]))/(np.max(errors[0,:]) - np.min(errors[0,:]))
s[1,:] = 1 - (errors[1,:] - np.min(errors[1,:]))/(np.max(errors[1,:]) - np.min(errors[1,:]))
# s[2,:] = 1 - (errors[2,:] - np.min(errors[2,:]))/(np.max(errors[2,:]) - np.min(errors[2,:]))

# # Test001
# if sum(s[0,:]<0.1)>20:
#   print("Anomaly..",sum(s[0,:]<0.1))
# else:
#   print("Normal Scenario..",sum(s[0,:]<0.1))
# # s[s[0,:]<0.1]
# plt.plot(s[0,:])
# plt.show()


# # Test032
# if (sum(s[1,:]<0.1)>20):
#   print("Anomaly..",sum(s[1,:]<0.1))
# else:
#   print("Normal Scenario..",sum(s[1,:]<0.1))
# print(sum(s[1,:]<0.1))
# plt.plot(s[1,:])
# plt.show()

# import cv2
# import glob
# # fol="gdrive/My Drive/Video Anomaly Detection/"
# img_array = []
# for filename in glob.glob('Test/Test001/*.tif'):
#     img = cv2.imread(filename)
#     height, width, layers = img.shape
#     size = (width,height)
#     img_array.append(img)
# out = cv2.VideoWriter('smart-video-surveillance\public\project.webm',cv2.VideoWriter_fourcc(*'VP90') , 20.0, size)
 
# for i in range(len(img_array)):
#     out.write(img_array[i])
# out.release()

# img_array = []
# for filename in glob.glob('Test/Test032/*.tif'):
#     img = cv2.imread(filename)
#     height, width, layers = img.shape
#     size = (width,height)
#     img_array.append(img)
# out = cv2.VideoWriter('smart-video-surveillance\public\project2.webm',cv2.VideoWriter_fourcc(*'VP90') , 20.0, size)
 
# for i in range(len(img_array)):
#     out.write(img_array[i])
# out.release()

@app.route('/',methods=['GET'])
def hello_world():
        return  jsonify({'Normal Condition' : str(sum(s[0,:]<0.1)),'Anomoly' : str(sum(s[1,:]<0.1))})