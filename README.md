# kkday homework stories
## Feature
* 顯示目前讀取進度
  * 進度使用 CSS3 Animation 控制 translateX，而不是修改 width 動畫效能
* 桌面或移動裝置，操作方法一致
  * 點選畫面左邊、右邊切換
  * 按住畫面會暫停
* 暫存之前存取過的 story，不每次抓 Story
* 無法取得資料時，跳出重新載入畫面讓用戶重新抓取資料。
![](https://i.imgur.com/KmAOWfs.png)
* SPA 第一次載入速度過慢 (3G 網路)，Pre render 文字讓用戶知道目前載入中。
* 元件畫面 & 邏輯分離
  * VStroy.vue 專注畫面顯示
  * App.vue 專注邏輯控制。
* 依照權重隨機顯示 story
## todo feature
* image 做 lazy load，後端給 placeHolder，或是分析圖片顏色給相應的背景色。