## Mapping의 2가지 방법

### 1. Landmark/Feature

- 센서 데이터를 그대로 사용하지 않고 주변의 특징점을 가지고 맵을 만드는 방식
- 정확한 방식으로 표현이 가능
- feature을 인지하는 알고리즘에 의존적
- 주로 카메라의 이미지를 기반으로 한 descriptor를 사용함
- QR code, SURF, SIFT를 사용함
- 카메라만으로 거리정보까지 정확히 구별이 힘듦

### 2. Grid Map

- 공간을 grid cell로 표현
- 센서로 측정하여 물체가 존재하지 않는 free space와 물체가 존재하는 occupied space를 직접 cell 에 표시하는 방식
- grid cell을 채울 메모리를 필요로 함
- landmark를 표현하는 파라미터와 인지 알고리즘에 의존하지 않음
- 2D 라이더를 이용하여 직접 cell에 맵을 새김



## Bresenham's line algorithm을 구현해서 이미지에 직선을 그리는 메소드

- 로직 7번에서 오류 발생

- ValueError: could not broadcast input array from shape (59,) into shape (60,)

- 내일 해결해야 함

```python
def createLineIterator(P1, P2, img):

    # Bresenham's line algorithm을 구현해서 이미지에 직선을 그리는 메소드입니다.
    
    # 로직 순서
    # 1. 두 점을 있는 백터의 x, y 값과 크기 계산
    # 2. 직선을 그릴 grid map의 픽셀 좌표를 넣을 numpy array 를 predifine
    # 3. 직선 방향 체크
    # 4. 수직선의 픽셀 좌표 계산
    # 5. 수평선의 픽셀 좌표 계산
    # 6. 대각선의 픽셀 좌표 계산
    # 7. 맵 바깥 픽셀 좌표 삭제

   
    imageH = img.shape[0] #height
    imageW = img.shape[1] #width
    P1Y = P1[1] #시작점 y 픽셀 좌표
    P1X = P1[0] #시작점 x 픽셀 좌표
    P2X = P2[0] #끝점 y 픽셀 좌표
    P2Y = P2[1] #끝점 x 픽셀 좌표

    """
    로직 1 : 두 점을 있는 백터의 x, y 값과 크기 계산
    """
    
    dX = P2X - P1X 
    dY = P2Y - P1Y
    dXa = np.abs(dX)
    dYa = np.abs(dY)


    """
    # 로직 2 : 직선을 그릴 grid map의 픽셀 좌표를 넣을 numpy array 를 predifine
    """

    itbuffer = np.empty(shape = (np.maximum(dYa,dXa), 3), dtype=np.float32)
    itbuffer.fill(np.nan)

    """
    # 로직 3 : 직선 방향 체크
    """
 
    negY = True if dY < 0 else False
    negX = True if dX < 0 else False
 
    
    """ 
    # 로직 4 : 수직선의 픽셀 좌표 계산   
    """
    if P1X == P2X:        
        itbuffer[:,0] = P1X
        if negY:
            itbuffer[:,1] = np.arange(P1Y - 1, P1Y - dYa -1, -1)
        else:
            itbuffer[:,1] = np.arange(P1Y + 1, P1Y + dYa + 1)
     

        """
        # 로직 5 : 수평선의 픽셀 좌표 계산
        """
    elif P1Y == P2Y:        
        itbuffer[:,1] = P1Y
        if negX:
            itbuffer[:,0] = np.arange(P1X - 1, P1X - dXa - 1, -1)
        else:
            itbuffer[:,0] = np.arange(P1X + 1, P1X + dXa + 1)
     

        """ 
        # 로직 6 : 대각선의 픽셀 좌표 계산  
        """
    else:        
        steepSlope = dYa > dXa 
        if steepSlope:
            slope = dX.astype(np.float32) / dY.astype(np.float32)
            if negY:
                itbuffer[:,1] = np.arange(P1Y - 1, P1Y - dYa - 1, -1)
            else:
                itbuffer[:,1] = np.arange(P1Y + 1, P1Y + dYa + 1)
            itbuffer[:,0] = (slope * (itbuffer[:,1] - P1Y)).astype(np.int) + P1X
        else:
            slope = dY.astype(np.float32) / dX.astype(np.float32)
            if negX:
                itbuffer[:,0] = np.arange(P1X - 1, P1X - dXa - 1, -1)
            else:
                itbuffer[:,0] = np.arange(P1X + 1, P1X + dXa)
            itbuffer[:,1] = (slope * (itbuffer[:,0] - P1X)).astype(np.int) + P1Y



    
    """
    로직 7 : 맵 바깥 픽셀 좌표 삭제.
    """
    colX = itbuffer[:,0]
    colY = itbuffer[:,1]
    print(colX, colY)
    itbuffer = itbuffer[(colX >= 0 ) & (colY >= 0) & (colX < imageW) & (colY < imageH)]
    
    # itbuffer = []
    itbuffer[:,2] = img[itbuffer[:,1].astype(np.uint), itbuffer[:,0].astype(np.uint)]

    return itbuffer
```
