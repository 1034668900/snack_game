// 游戏配置文件

// 1. 地图相关配置
// 存储地图数据
let mapData = [];

let tr = 30;
let td = 30;

// 2. 蛇相关配置
// 蛇身大小
let snackBody = 20;

// 按键方向计算配置(按键方向新蛇头坐标相对于旧蛇头坐标)
let directionFlag = {
  Up: { x: 0, y: -1, flag: "Up" },
  Down: { x: 0, y: 1, flag: "Down" },
  Left: { x: -1, y: 0, flag: "Left" },
  Right: { x: 1, y: 0, flag: "Right" },
};

// 游戏分数
let score = 0;
// 定时器ID
let timer = null;
// 移动速度
let speed = 500;

// 蛇整体数据初始化
/* 
    参数说明：
        1. x,y ： 位置坐标
        2. domContent :  dom元素
        3. flag ： 用于判断是蛇身还是蛇头
*/
let Snack = {
  // 默认向右运动
  direction: directionFlag.Right,
  snackPosition: [
    { x: 0, y: 0, domContent: "", flag: "body" },
    { x: 1, y: 0, domContent: "", flag: "body" },
    { x: 2, y: 0, domContent: "", flag: "body" },
    { x: 3, y: 0, domContent: "", flag: "head" },
  ],
};

// 3.苹果相关配置
// 苹果数据初始化
let appleData = {
  x: 0,
  y: 0,
  domContent: "",
};

// 获取开始按钮DOM元素
let startBtn = document.querySelector(".startBtn");
// 获取标题和作者dom
let title = document.querySelector('.title')
let author = document.querySelector('.author')



// 模式选择标识
let mode_flag = false;

// 获取dom元素
let simple_mode = document.querySelector(".simple_mode");
let mediun_mode = document.querySelector(".mediun_mode");
let dif_mode = document.querySelector(".dif_mode");
let hell_mode = document.querySelector(".hell_mode");

simple_mode.onclick = function () {
  if (!mode_flag) {
    mode_flag = true;
    speed = 200;
    simple_mode.style.background = "rgba(58, 61, 65,0.5)";
  }
};
mediun_mode.onclick = function () {
  if (!mode_flag) {
    mode_flag = true;
    speed = 120;
    mediun_mode.style.background = "rgba(58, 61, 65,0.5)";
  }
};
dif_mode.onclick = function () {
  if (!mode_flag) {
    mode_flag = true;
    speed = 70;
    dif_mode.style.background = "rgba(58, 61, 65,0.5)";
  }
};
hell_mode.onclick = function () {
  if (!mode_flag) {
    mode_flag = true;
    speed = 30;
    hell_mode.style.background = "rgba(58, 61, 65,0.5)";
  }
};
