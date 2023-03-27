# Pytorch, yolo v5 설치 과정

### Versions

- python - 3.7.5
- cuda - 11.2
- cudnn - 8.1.0.77
- pytorch - torch==1.8.1+cu111 torchvision==0.9.1+cu111 torchaudio==0.8.1

### Pytorch 설치하기

- 우리는 cuda 11.2 버전을 사용하고 있지만, pytorch에서 해당 버전이 존재하지 않는다. 해결 방법으로는 pytorch cuda 11.1 버전이 cuda 11.2 버전에서도 정상동작하는 것을 확인해서 해당 pytorch 버전을 설치해주면된다….

```bash
# CUDA 11.1
pip install torch==1.8.1+cu111 torchvision==0.9.1+cu111 torchaudio==0.8.1 -f https://download.pytorch.org/whl/torch_stable.html
```

- 설치 확인(해당 파이썬 파일을 실행시켜줬을때 에러가 나지 않고 결과값이 잘 출력되어야한다.)

```bash
import torch

dtype = torch.float
#device = torch.device("cpu") # cpu
device = torch.device("cuda:0") # gpu

# N은 배치 크기이며, D_in은 입력의 차원입니다;
# H는 은닉층의 차원이며, D_out은 출력 차원입니다.
N, D_in, H, D_out = 64, 1000, 100, 10

# 무작위의 입력과 출력 데이터를 생성합니다.
x = torch.randn(N, D_in, device=device, dtype=dtype)
y = torch.randn(N, D_out, device=device, dtype=dtype)

# 무작위로 가중치를 초기화합니다.
w1 = torch.randn(D_in, H, device=device, dtype=dtype)
w2 = torch.randn(H, D_out, device=device, dtype=dtype)

learning_rate = 1e-6
for t in range(500):
    # 순전파 단계: 예측값 y를 계산합니다.
    h = x.mm(w1)
    h_relu = h.clamp(min=0)
    y_pred = h_relu.mm(w2)

    # 손실(loss)을 계산하고 출력합니다.
    loss = (y_pred - y).pow(2).sum().item()
    if t % 100 == 99:
        print(t, loss)

    # 손실에 따른 w1, w2의 변화도를 계산하고 역전파합니다.
    grad_y_pred = 2.0 * (y_pred - y)
    grad_w2 = h_relu.t().mm(grad_y_pred)
    grad_h_relu = grad_y_pred.mm(w2.t())
    grad_h = grad_h_relu.clone()
    grad_h[h < 0] = 0
    grad_w1 = x.t().mm(grad_h)

    # 경사하강법(gradient descent)를 사용하여 가중치를 갱신합니다.
    w1 -= learning_rate * grad_w1
    w2 -= learning_rate * grad_w2
```

### Yolo v5 설치

- pytorch hub를 이용하여 yolo_v5를 실행 시킬 것이다.
- 바탕화면에서 git bash로 yolo v5 깃을 클론해온다.

```bash
git clone https://github.com/ultralytics/yolov5  # clone
```

- yolov5 폴더로 접근한다.

```bash
cd yolov5
```

- yolo v5에서 요구하는 패키지들을 설치해준다.

```bash
pip install -r requirements.txt
```

- 설치 확인(에러가 발생하지 않고 해당 이미지에서 객체 탐지가 잘 되어

```bash
import torch

# Model
model = torch.hub.load("ultralytics/yolov5", "yolov5s")  # or yolov5n - yolov5x6, custom

# Images
img = "https://ultralytics.com/images/zidane.jpg"  # or file, Path, PIL, OpenCV, numpy, list

# Inference
results = model(img)

# Results
results.print()  # or .show(), .save(), .crop(), .pandas(), etc.
```