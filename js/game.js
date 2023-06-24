// 初始化游戏
function initGame() {
  // 1. 初始化地图
  initMap();
  // 2. 绘制蛇
  drawSnack();
  // 3. 绘制食物
  drawApple();
}

// 地图初始化
function initMap() {
  for (let i = 0; i < td; i++) {
    for (let j = 0; j < tr; j++) {
      mapData.push({
        x: j,
        y: i,
      });
    }
  }
}

// 绘制蛇
function drawSnack() {
  Snack.snackPosition.forEach((item) => {
    if (!item.domContent) {
      // 第一次创建蛇
      // 创建元素
      item.domContent = document.createElement("div");
      item.domContent.style.width = snackBody + "px";
      item.domContent.style.height = snackBody + "px";
      item.domContent.style.position = "absolute";
      item.domContent.style.left = item.x * snackBody + "px";
      item.domContent.style.top = item.y * snackBody + "px";
      // 根据flag绘制蛇头和蛇身
      if (item.flag === "head") {
        // 蛇头
        item.domContent.style.background = `url('../snack_game/img/snack_head.png') center/contain no-repeat`;
        // 根据蛇的运动方向旋转蛇头
        switch (Snack.direction.flag) {
          case "Up":
            item.domContent.style.transform = `rotate(-90deg)`;
            break;
          case "Down":
            item.domContent.style.transform = `rotate(90deg)`;
            break;
          case "Left":
            item.domContent.style.transform = `rotate(180deg)`;
            break;
          case "Right":
            item.domContent.style.transform = `rotate(0deg)`;
            break;
        }
      } else {
        // 蛇身
        item.domContent.style.backgroundColor = "rgb(14, 205, 65)";
        item.domContent.style.borderRadius = "50%";
      }
      // 插入地图
      document.querySelector(".container").append(item.domContent);
    }
  });
}

// 绘制苹果
/* 
    注意事项：
        1. 苹果出现的位置是随机的
        2. 苹果不能出现在游戏界面外
        3. 苹果不能出现在蛇身和蛇头
*/
function drawApple() {
  while (true) {
    // 默认生成的随机坐标符合要求
    let legalFlag = true;
    appleData.x = Math.floor(Math.random() * td);
    appleData.y = Math.floor(Math.random() * tr);
    // 遍历蛇的数据，判断是否合法
    Snack.snackPosition.forEach((item) => {
      if (item.x == appleData.x && item.y == appleData.y) {
        // 说明有重合
        legalFlag = false;
      }
    });
    if (legalFlag) {
      // 说明没有重合,跳出死循环
      break;
    }
  }

  // 苹果的dom只需要创建一次，此处做一个判断
  if (!appleData.domContent) {
    // 不存在
    // 创建dom并调整样式
    appleData.domContent = document.createElement("div");
    appleData.domContent.style.width = snackBody + "px";
    appleData.domContent.style.height = snackBody + "px";
    appleData.domContent.style.left = appleData.x * snackBody + "px";
    appleData.domContent.style.top = appleData.y * snackBody + "px";
    appleData.domContent.style.background = `url('../snack_game/img/apple.png') center/contain no-repeat`;
    appleData.domContent.style.position = "absolute";
  } else {
    // 已存在
    appleData.domContent.style.left = appleData.x * snackBody + "px";
    appleData.domContent.style.top = appleData.y * snackBody + "px";
  }
  // 插入dom
  document.querySelector(".container").append(appleData.domContent);
}

// 判断蛇是否碰到边界、自己、食物
function isCrash(newHead) {
  let crashFlag = {
    // 碰到边界以及自己
    crashBorder: false,
    // 吃到食物
    eatFood: false,
  };
  // 碰到边界
  if (newHead.x < 0 || newHead.x >= td || newHead.y < 0 || newHead.y >= tr) {
    crashFlag.crashBorder = true;
  }
  // 碰到自己
  Snack.snackPosition.forEach((item) => {
    if (newHead.x == item.x && newHead.y == item.y) {
      crashFlag.crashBorder = true;
    }
  });

  // 吃到食物
  if (newHead.x == appleData.x && newHead.y == appleData.y) {
    crashFlag.eatFood = true;
  }
  return crashFlag;
}

// 绑定事件
function bindEvent() {
  // 键盘按下控制方向事件
  document.onkeydown = function (e) {
    if (
      (e.key == "ArrowUp" || e.key.toLocaleLowerCase() == "w") &&
      Snack.direction.flag !== "Down"
    ) {
      // 上
      // 修改蛇头移动方向
      Snack.direction = directionFlag.Up;
      // 移动蛇
      //snackMove();
    }
    if (
      (e.key == "ArrowDown" || e.key.toLocaleLowerCase() == "s") &&
      Snack.direction.flag !== "Up"
    ) {
      // 下
      Snack.direction = directionFlag.Down;
      // 移动蛇
      //snackMove();
    }
    if (
      (e.key == "ArrowLeft" || e.key.toLocaleLowerCase() == "a") &&
      Snack.direction.flag !== "Right"
    ) {
      // 左
      Snack.direction = directionFlag.Left;
      // 移动蛇
      //snackMove();
    }
    if (
      (e.key == "ArrowRight" || e.key.toLocaleLowerCase() == "d") &&
      Snack.direction.flag !== "Left"
    ) {
      // 右
      Snack.direction = directionFlag.Right;
      // 移动蛇
      //snackMove();
    }
    // 自动移动
    autoMove();
  };
  // 屏幕点击暂停事件
  document.querySelector(".container").onclick = function (e) {
    if (e.target.className === "container") {
      document.querySelector(".pauseBtn").style.display = "block";
      // 清理定时器，阻止移动
      clearInterval(timer);
    } else {
      // 隐藏暂停按钮
      document.querySelector(".pauseBtn").style.display = "none";
      // 恢复运动
      autoMove();
    }
  };

  // 这是事件是第一次的pauseBtn
  // 暂停按键事件
  document.querySelector(".pauseBtn").onclick = function (e) {
    // 阻止冒泡
    e.stopPropagation();
    // 隐藏暂停按钮
    document.querySelector(".pauseBtn").style.display = "none";
    // 开始运动
    autoMove();
  };
}

// 移动蛇
function snackMove() {
  // 旧蛇头
  let oldHead = Snack.snackPosition[Snack.snackPosition.length - 1];
  /// 新蛇头
  let newHead = {
    x: oldHead.x + Snack.direction.x,
    y: oldHead.y + Snack.direction.y,
    domContent: "",
    flag: "head",
  };
  // 判断新蛇头是否碰撞
  let Flag = isCrash(newHead);
  if (Flag.crashBorder) {
    // 碰撞边界或自己
    if (window.confirm(`游戏结束，您当前得分为：${score},是否重新开始？`)) {
      // 重新开始--初始化数据
      // 删除div节点
      document.querySelector(".container").innerHTML = `
      <!-- 开始游戏 -->
      <button class="startBtn" style="display:none"></button>
      <!-- 暂停游戏 -->
      <button class="pauseBtn" style="display:none"></button>
      `;
      // 分数清零
      score = 0;
      // 重置蛇的运动方向
      Snack = {
        // 默认向右运动
        direction: directionFlag.Right,
        snackPosition: [
          { x: 0, y: 0, domContent: "", flag: "body" },
          { x: 1, y: 0, domContent: "", flag: "body" },
          { x: 2, y: 0, domContent: "", flag: "body" },
          { x: 3, y: 0, domContent: "", flag: "head" },
        ],
      };
      // 重置苹果的位置
      appleData = {
        x: 0,
        y: 0,
        domContent: "",
      };
      // 初始化游戏
      initGame();
      bindEvent()
    } else {
      clearInterval(timer);
      // 结束游戏-取消绑定的事件
      document.onkeydown = null;
    }
    return;
  }
  // 将旧蛇头修改为蛇身
  oldHead.flag = "body";
  oldHead.domContent.style.background = "rgb(14, 205, 65)";
  oldHead.domContent.style.borderRadius = "50%";
  // 将新蛇头插入到蛇的位置数据中
  Snack.snackPosition.push(newHead);
  if (Flag.eatFood) {
    // 吃到食物--重新生成食物
    drawApple();
    // 分数+1
    score++;
  } else {
    // 没吃到食物，没碰撞,删除蛇身
    // 移除.container第一个节点
    document
      .querySelector(".container")
      .removeChild(Snack.snackPosition[0].domContent);
    // 删除Snack.snackPosition第一个元素
    Snack.snackPosition.shift();
  }

  // 重新绘制蛇
  drawSnack();
}

// 自动移动蛇
function autoMove() {
  // 清理上一次定时器
  clearInterval(timer);
  timer = setInterval(() => {
    snackMove();
  }, speed);
}
