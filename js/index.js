// 游戏入口文件
function main() {
  // 点击开始游戏按钮后才执行以下内容
  startBtn.onclick = function (e) {
    // 取消冒泡
    e.stopPropagation();
    // 模式选择后才能点击开始
    if (mode_flag) {
      // 1. 初始化游戏
      initGame();
      // 2. 绑定事件
      bindEvent();
      // 隐藏样式
      startBtn.style.display = "none";
      simple_mode.style.display = 'none'
      mediun_mode.style.display = 'none'
      dif_mode.style.display = 'none'
      hell_mode.style.display = 'none'
      title.style.display = "none"
      author.style.display = "none"
      // 开始运动
      autoMove();
    } else {
      alert("请先选择模式");
    }
  };
}

main();
