//sample1

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const stage = new createjs.Stage(canvas);

  const slideBar = new createjs.Shape();
  slideBar.graphics.beginFill('black').drawRect(0, 0, 300, 30);
  stage.addChild(slideBar);
  slideBar.x = 100;
  slideBar.y = 150;

  // スライドバーの長さを設定
  const slideBarLength = 300;

  // スライド用のハンドル
  const slider = new createjs.Shape();
  slider.graphics.beginFill('blue').drawRect(0, 0, 30, 30); // ハンドルのサイズ
  slider.setBounds(0, 0, 30, 30);
  slider.x = 100; // スライドバーの開始位置
  slider.y = 150; // 縦方向は固定

  stage.addChild(slider);

  let isDragging = false;
  let startX = 0;

  // スライド可能な範囲を設定
  const minPosition = slider.x; // スライドの最小位置
  const maxPosition = 100 + slideBarLength - slider.getBounds().width; // スライドの最大位置

  // マウスダウン時のイベント
  slider.on('mousedown', (evt: Object) => {
    const mouseEvent = evt as createjs.MouseEvent;
    isDragging = true;
    startX = mouseEvent.stageX - slider.x;
    createjs.Tween.removeTweens(slider); // 既存のアニメーションをキャンセル
  });
  // マウス移動時のイベント
  slider.on('pressmove', (evt: Object) => {
    const mouseEvent = evt as createjs.MouseEvent;
    if (isDragging) {
      let newX = mouseEvent.stageX - startX;

      // スライダーの位置を制限（スライドバー内に収める）
      if (newX < minPosition) {
        newX = minPosition;
      } else if (newX > maxPosition) {
        newX = maxPosition;
      }

      slider.x = newX;
      stage.update();
    }
  });

  // マウスアップ時のイベント（ドラッグ終了）
  slider.on('pressup', () => {
    isDragging = false;
    console.log(`スライダーは位置 ${slider.x} で止まりました`);
    // アニメーションを追加しない。離した位置で止める。
  });

  // アニメーションの長さ
  const animationDuration = 3000; // 5秒で移動
  let tween: createjs.Tween | null = null;
  let isClicked = false;

  // アニメーションを開始するボタン
  const startButton = document.getElementById('startButton');
  startButton?.addEventListener('click', () => {
    tween = createjs.Tween.get(slider).to({ x: maxPosition }, animationDuration);
  });

  // アニメーションを途中で停止するボタン
  const stopButton = document.getElementById('stopButton');
  stopButton?.addEventListener('click', () => {
    if (tween) {
      const currentProgress = tween.position / animationDuration; // 現在の進行割合を取得
      tween.gotoAndStop(currentProgress * animationDuration); // 進行割合に応じて停止
      console.log(currentProgress * animationDuration);

      console.log(`アニメーションを停止しました。進行度: ${currentProgress * 100}%`);
    }
  });

  // ステージの更新
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener('tick', stage);
};

//sample 2
//フレームでの制御　ticker
import { Stage, Shape, Ticker } from 'createjs-module';

window.onload = () => {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  const stage = new Stage(canvas);

  // スライドバーの長さを設定
  const slideBarLength = 300;

  // スライド用のハンドル
  const slider = new Shape();
  slider.graphics.beginFill('blue').drawRect(0, 0, 30, 30); // ハンドルのサイズ
  slider.x = 100; // スライドバーの開始位置
  slider.y = 150; // 縦方向は固定

  stage.addChild(slider);

  // アニメーションのフレーム単位での設定
  const totalFrames = 300; // アニメーション全体が300フレームで完了
  let currentFrame = 0; // 現在のフレーム
  let isPlaying = false; // アニメーションが再生中かどうか

  // スライダーの移動範囲
  const minPosition = slider.x; // スライドの最小位置
  const maxPosition = slider.x + slideBarLength - slider.getBounds().width; // スライドの最大位置

  // アニメーションの進行を制御する関数
  const animateSlider = () => {
    if (isPlaying && currentFrame <= totalFrames) {
      const progress = currentFrame / totalFrames; // 進行度 (0 ~ 1)
      slider.x = minPosition + (maxPosition - minPosition) * progress;
      currentFrame++;
      stage.update();
    }
  };

  // Tickerで毎フレームごとに実行する
  Ticker.framerate = 60;
  Ticker.addEventListener('tick', animateSlider);

  // アニメーションを開始するボタン
  const startButton = document.getElementById('startButton');
  startButton?.addEventListener('click', () => {
    isPlaying = true;
    currentFrame = 0; // 最初のフレームから開始
    console.log('アニメーション開始');
  });

  // アニメーションを途中で停止するボタン
  const stopButton = document.getElementById('stopButton');
  stopButton?.addEventListener('click', () => {
    isPlaying = false;
    console.log(`アニメーション停止。フレーム: ${currentFrame}`);
  });

  // アニメーションを再開するボタン
  const resumeButton = document.getElementById('resumeButton');
  resumeButton?.addEventListener('click', () => {
    isPlaying = true;
    console.log('アニメーション再開');
  });

  // ステージの初期描画
  stage.update();
};

//sample 3 setInterval

window.onload = () => {
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  const stage = new createjs.Stage(canvas);

  // スライドバーの長さを設定
  const slideBarLength = 300;

  // スライド用のハンドル
  const slider = new createjs.Shape();
  slider.graphics.beginFill('blue').drawRect(0, 0, 30, 30); // ハンドルのサイズ
  slider.x = 100; // スライドバーの開始位置
  slider.y = 150; // 縦方向は固定

  stage.addChild(slider);

  // アニメーションのフレーム単位での設定
  const totalFrames = 300; // アニメーション全体が300フレームで完了
  let currentFrame = 0; // 現在のフレーム
  let isPlaying = false; // アニメーションが再生中かどうか
  let intervalId: number | null = null; // `setInterval`のIDを管理

  // スライダーの移動範囲
  const minPosition = slider.x; // スライドの最小位置
  const maxPosition = slider.x + slideBarLength - slider.getBounds().width; // スライドの最大位置

  // アニメーションの進行を制御する関数
  const animateSlider = () => {
    if (currentFrame <= totalFrames) {
      const progress = currentFrame / totalFrames; // 進行度 (0 ~ 1)
      slider.x = minPosition + (maxPosition - minPosition) * progress;
      currentFrame++;
      stage.update();
    } else {
      clearInterval(intervalId!); // アニメーションが終わったら停止
    }
  };

  // アニメーションを開始する関数
  const startAnimation = () => {
    if (intervalId) {
      clearInterval(intervalId); // すでにアニメーションが再生中の場合停止
    }
    currentFrame = 0; // 最初のフレームから開始
    intervalId = window.setInterval(animateSlider, 1000 / 60); // 60 FPSでアニメーション
    isPlaying = true;
  };

  // アニメーションを停止する関数
  const stopAnimation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      isPlaying = false;
    }
  };

  // アニメーションを再開する関数
  const resumeAnimation = () => {
    if (!isPlaying) {
      intervalId = window.setInterval(animateSlider, 1000 / 60); // 60 FPSで再開
      isPlaying = true;
    }
  };

  // ボタンのイベントリスナー
  const startButton = document.getElementById('startButton');
  startButton?.addEventListener('click', startAnimation);

  const stopButton = document.getElementById('stopButton');
  stopButton?.addEventListener('click', stopAnimation);

  const resumeButton = document.getElementById('resumeButton');
  resumeButton?.addEventListener('click', resumeAnimation);

  // ステージの初期描画
  stage.update();
};
