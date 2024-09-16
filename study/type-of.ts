/* 型ガードについて */
/*
型ガードは、ある変数が特定の型を持っていることをチェックし、その範囲で型を制約するための方法。
型ガードはコードの特定の部分で変数が特定の型を持っていると保証します。
*/

/* instanceof演算子、typeof演算子、in演算子などを使う */
/* 基本的な使用例 */

/* typeof演算子 */
/*
値に対して特定の型かどうかをチェックする。
注意点は、値がnllの場合objectを返す点
*/

// const inputData = (data: string | number): string => {
//   if (typeof data === 'number') {
//     return data.toString();
//   } else {
//     return data;
//   }
// };

// console.log(inputData('文字列'));
// console.log(inputData(1234));

/* instanceof演算子 */
/* 要素がクラスのインスタンスかどうかをチェックする。*/

type BaseCar = {
  body: string;
  tire: string;
  engin: string;
};

// class Truck implements BaseCar {
//   body: 'truck';
//   tire: 'loadTire';
//   engin: 'strongEngin';
//   loadingCapacity: string = '500kg';
//   constructor() {}
// }

// class ElectricCar implements BaseCar {
//   body: 'normal';
//   tire: 'normalTire';
//   engin: 'baseEngin';
//   chargingCapacity: string = '40kWh';
//   constructor() {}
// }

// const truck = new Truck();
// const electricCar = new ElectricCar();

// const getCarPrice = (car: Truck | ElectricCar) => {
//   if (car instanceof Truck) {
//     console.log('金額は500万円です');
//   } else {
//     console.log('金額は800万円です');
//   }
// };

// getCarPrice(truck);
// getCarPrice(electricCar);

/* in演算子 */
/* オブジェクトのプロパティの存在をチェックすることができる。*/

// const checkCarFunction = (car: Truck | ElectricCar) => {
//   if ('loadingCapacity' in car) {
//     console.log('荷物をたくさん運べます');
//   } else {
//     console.log('電気を充電して利用できます');
//   }
// };

// checkCarFunction(truck);
// checkCarFunction(electricCar);

//////////////////////////////////
/* ユーザー定義のType Guard */

// type Truck = BaseCar & {
//   loadingCapacity: string;
// };

// type ElectricCar = BaseCar & {
//   chargingCapacity: string;
// };

// /* 自身でタイプガードを定義する */
// const isTruck = (car: any): car is Truck => {
//   if (car === false) {
//     return false;
//   }
//   return 'loadingCapacity' in car;
// };

// /* 自身でタイプガードを定義する */
// const isTruck = (car: any): car is Truck => {
//   if (false) {
//     return false;
//   }
//   return 'loadingCapacity' in car;
// };

// typeof data === 'number'
// const checkFunction = (car: Truck | ElectricCar) => {
//   if (isTruck(car)) {
//     console.log(car.loadingCapacity); // OK
//     // console.log(arg.chargingCapacity); // Error!
//   } else {
//     // console.log(arg.LoadingCapacity); // Error!
//     console.log(car.chargingCapacity); // OK
//   }
// };

// checkFunction({ body: 'truck', tire: 'loadTire', engin: 'strongEngin', loadingCapacity: '500kg' });
// checkFunction({ body: 'normal', tire: 'normal', engin: 'baseEngin', chargingCapacity: '40kWh' });
