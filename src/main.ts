/*ジェネリクス (generics) とは？*/

/*引用
あらゆる型で同じコードを使おうとすると、型の安全性が犠牲になります。
逆に、型の安全性を重視しようとすると、同じようなコードを量産する必要が出てコードの共通化が達成しづらくなります。
こうした問題を解決するために導入された言語機能がジェネリクスです。
ジェネリクスを用いると、型の安全性とコードの共通化を両立することができます。
*/

const chooseRandomlyString = (a: string, b: string): string => {
  return Math.random() <= 0.5 ? a : b;
};

// const winOrLose = chooseRandomlyString('Won', ’Lose');
// console.log(winOrLose);

const chooseRandomlyNumber = (a: number, b: number): number => {
  return Math.random() <= 0.5 ? a : b;
};
// const num: number = chooseRandomlyNumber(1, 2);
// console.log(num);

const urlA = new URL('https://example1.com');
const urlB = new URL('https://example2.com');

const chooseRandomlyURL = (a: URL, b: URL): URL => {
  return Math.random() <= 0.5 ? a : b;
};
// const url: URL = chooseRandomlyURL(urlA, urlB);
// console.log(url);

//Sample anyにすると,どの値も受け取れるようにできるが、、、
const chooseRandomlySample = (a: any, b: any): any => {
  return Math.random() <= 0.5 ? a : b;
};
// let str = chooseRandomlySample(0, 1);
// str = str.toLowerCase(); //stringで扱いたいが実行時にエラーになる

/*どのように共通化すればいいのか?*/

/*引用
「ジェネリクスの発想は実はとてもシンプルで、型も変数のように扱えるようにする」
*/

/*
以下のようにジェネリクスを使うことによって同じ記述で複数の型で利用できるよう共通化が可能になる
型を引数のように扱えるようになる。
*/

const chooseRandomly = <T>(a: T, b: T): T => {
  //Tは観衆的に利用される
  return Math.random() <= 0.5 ? a : b;
};

const str = chooseRandomly<string>('Won', 'Lose');
// console.log(str);
const num = chooseRandomly<number>(1, 5);
// console.log(num);
const url = chooseRandomly<URL>(urlA, urlB);
// console.log(url.origin);

/*classなどでも利用できる*/

class StringList {
  private data: string[] = [];
  constructor() {}

  addItem(item: string): void {
    this.data.push(item);
  }

  getItem(index: number): string {
    return this.data[index];
  }
}

// const strList = new StringList();
// strList.addItem('aaa');
// //strList.addItem(0);// numberは追加できない
// console.log(strList);
// console.log(strList.getItem(0));

class NumberList {
  private data: number[] = [];
  constructor() {}

  addItem(item: number): void {
    this.data.push(item);
  }

  getItem(index: number): number {
    return this.data[index];
  }
}

// const numList = new NumberList();
// numList.addItem(1);
// console.log(numList);
// console.log(numList.getItem(1));

class List<T> {
  private data: T[] = [];
  constructor() {}

  addItem(item: T): void {
    this.data.push(item);
  }

  getItem(index: number): T {
    return this.data[index];
  }
}

const strList = new List<string>();
strList.addItem('aaa');
strList.addItem('bbb');
console.log(strList.getItem(0));
console.log(strList.getItem(1));

const numList = new List<number>();
numList.addItem(1);
numList.addItem(10);
console.log(numList.getItem(0));
console.log(numList.getItem(1));
