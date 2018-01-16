import Lagrange from './lagrange';

export default class Filter {
  constructor() {
    this._redLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._blueLagrange = new Lagrange(0, 0, 255, 255);
  }
  apply(data) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = this._redLagrange.valueOf(data[i]);
      data[i + 1] = this._redLagrange.valueOf(data[i + 1]);
      data[i + 2] = this._redLagrange.valueOf(data[i + 2]);
    }
  }
  none() {
    this._redLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._blueLagrange = new Lagrange(0, 0, 255, 255);
  }
  amoro() {
    this._redLagrange = new Lagrange(0, 19, 255, 250);
    this._redLagrange.addPoint(30, 62);
    this._redLagrange.addPoint(82, 148);
    this._redLagrange.addPoint(122, 88);
    this._redLagrange.addPoint(145, 200);

    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange.addPoint(48, 72);
    this._greenLagrange.addPoint(115, 188);
    this._greenLagrange.addPoint(160, 120);
    this._greenLagrange.addPoint(233, 245);

    this._blueLagrange = new Lagrange(0, 25, 255, 245);
    this._blueLagrange.addPoint(35, 80);
    this._blueLagrange.addPoint(106, 75);
    this._blueLagrange.addPoint(151, 188);
    this._blueLagrange.addPoint(215, 215);
    this._blueLagrange.addPoint(240, 235);
  }
  mayfair() {
    this._redLagrange = new Lagrange(0, 30, 254, 242);
    this._redLagrange.addPoint(85, 110);
    this._redLagrange.addPoint(125, 170);
    this._redLagrange.addPoint(221, 232);

    this._greenLagrange = new Lagrange(0, 15, 255, 230);
    this._greenLagrange.addPoint(40, 55);
    this._greenLagrange.addPoint(80, 95);
    this._greenLagrange.addPoint(142, 196);
    this._greenLagrange.addPoint(188, 215);

    this._blueLagrange = new Lagrange(0, 15, 255, 225);
    this._blueLagrange.addPoint(45, 60);
    this._blueLagrange.addPoint(85, 115);
    this._blueLagrange.addPoint(135, 185);
    this._blueLagrange.addPoint(182, 215);
    this._blueLagrange.addPoint(235, 230);
  }
  rise() {
    this._redLagrange = new Lagrange(0, 25, 255, 255);
    this._redLagrange.addPoint(30, 70);
    this._redLagrange.addPoint(130, 192);
    this._redLagrange.addPoint(170, 200);
    this._redLagrange.addPoint(233, 233);

    this._greenLagrange = new Lagrange(0, 25, 255, 255);
    this._greenLagrange.addPoint(30, 72);
    this._greenLagrange.addPoint(65, 118);
    this._greenLagrange.addPoint(100, 158);
    this._greenLagrange.addPoint(152, 195);
    this._greenLagrange.addPoint(210, 230);

    this._blueLagrange = new Lagrange(0, 35, 255, 255);
    this._blueLagrange.addPoint(40, 75);
    this._blueLagrange.addPoint(82, 124);
    this._blueLagrange.addPoint(120, 162);
    this._blueLagrange.addPoint(175, 188);
    this._blueLagrange.addPoint(220, 214);
  }
  hudson() {
    this._redLagrange = new Lagrange(0, 35, 255, 255);
    this._redLagrange.addPoint(42, 68);
    this._redLagrange.addPoint(85, 115);
    this._redLagrange.addPoint(124, 165);
    this._redLagrange.addPoint(170, 200);
    this._redLagrange.addPoint(215, 228);

    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange.addPoint(45, 60);
    this._greenLagrange.addPoint(102, 135);
    this._greenLagrange.addPoint(140, 182);
    this._greenLagrange.addPoint(192, 215);

    this._blueLagrange = new Lagrange(0, 0, 255, 245);
    this._blueLagrange.addPoint(24, 42);
    this._blueLagrange.addPoint(60, 100);
    this._blueLagrange.addPoint(105, 170);
    this._blueLagrange.addPoint(145, 208);
    this._blueLagrange.addPoint(210, 235);
  }
  valencia() {
    this._redLagrange = new Lagrange(0, 20, 255, 240);
    this._redLagrange.addPoint(50, 80);
    this._redLagrange.addPoint(85, 120);
    this._redLagrange.addPoint(128, 162);
    this._redLagrange.addPoint(228, 224);

    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange.addPoint(18, 12);
    this._greenLagrange.addPoint(60, 70);
    this._greenLagrange.addPoint(104, 128);
    this._greenLagrange.addPoint(148, 178);
    this._greenLagrange.addPoint(212, 224);

    this._blueLagrange = new Lagrange(0, 20, 255, 230);
    this._blueLagrange.addPoint(42, 62);
    this._blueLagrange.addPoint(80, 104);
    this._blueLagrange.addPoint(124, 144);
    this._blueLagrange.addPoint(170, 182);
    this._blueLagrange.addPoint(220, 210);
  }
  xPro2() {
    this._redLagrange = new Lagrange(0, 0, 255, 255);
    this._redLagrange.addPoint(42, 28);
    this._redLagrange.addPoint(105, 100);
    this._redLagrange.addPoint(148, 160);
    this._redLagrange.addPoint(185, 208);

    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange.addPoint(40, 25);
    this._greenLagrange.addPoint(85, 75);
    this._greenLagrange.addPoint(125, 130);
    this._greenLagrange.addPoint(165, 180);
    this._greenLagrange.addPoint(212, 230);

    this._blueLagrange = new Lagrange(0, 30, 255, 222);
    this._blueLagrange.addPoint(40, 58);
    this._blueLagrange.addPoint(82, 90);
    this._blueLagrange.addPoint(125, 125);
    this._blueLagrange.addPoint(170, 160);
    this._blueLagrange.addPoint(235, 210);
  }
  sierra() {
    this._redLagrange = new Lagrange(0, 10, 255, 245);
    this._redLagrange.addPoint(48, 88);
    this._redLagrange.addPoint(105, 155);
    this._redLagrange.addPoint(130, 180);
    this._redLagrange.addPoint(190, 212);
    this._redLagrange.addPoint(232, 234);

    this._greenLagrange = new Lagrange(0, 0, 255, 230);
    this._greenLagrange.addPoint(38, 72);
    this._greenLagrange.addPoint(85, 124);
    this._greenLagrange.addPoint(124, 160);
    this._greenLagrange.addPoint(172, 186);
    this._greenLagrange.addPoint(218, 210);

    this._blueLagrange = new Lagrange(0, 30, 255, 218);
    this._blueLagrange.addPoint(45, 82);
    this._blueLagrange.addPoint(95, 132);
    this._blueLagrange.addPoint(138, 164);
    this._blueLagrange.addPoint(176, 182);
    this._blueLagrange.addPoint(210, 200);
  }
  willow() {
    this._redLagrange = new Lagrange(0, 30, 255, 240);
    this._redLagrange.addPoint(68, 105);
    this._redLagrange.addPoint(95, 145);
    this._redLagrange.addPoint(175, 215);

    this._greenLagrange = new Lagrange(0, 30, 255, 230);
    this._greenLagrange.addPoint(55, 85);
    this._greenLagrange.addPoint(105, 160);
    this._greenLagrange.addPoint(198, 210);

    this._blueLagrange = new Lagrange(0, 30, 255, 288);
    this._blueLagrange.addPoint(40, 70);
    this._blueLagrange.addPoint(112, 165);
    this._blueLagrange.addPoint(195, 215);
  }
  loFi() {
    this._redLagrange = new Lagrange(0, 0, 255, 255);
    this._redLagrange.addPoint(40, 20);
    this._redLagrange.addPoint(88, 80);
    this._redLagrange.addPoint(128, 150);
    this._redLagrange.addPoint(170, 200);
    this._redLagrange.addPoint(230, 245);

    this._greenLagrange = new Lagrange(0, 0, 255, 255);
    this._greenLagrange.addPoint(35, 15);
    this._greenLagrange.addPoint(90, 70);
    this._greenLagrange.addPoint(105, 105);
    this._greenLagrange.addPoint(148, 180);
    this._greenLagrange.addPoint(188, 218);

    this._blueLagrange = new Lagrange(0, 0, 255, 255);
    this._blueLagrange.addPoint(62, 50);
    this._blueLagrange.addPoint(100, 95);
    this._blueLagrange.addPoint(130, 155);
    this._blueLagrange.addPoint(150, 182);
    this._blueLagrange.addPoint(190, 220);
  }
  filter() {
    this._redLagrange = new Lagrange();
    this._redLagrange.addPoint();
    this._redLagrange.addPoint();
    this._redLagrange.addPoint();
    this._redLagrange.addPoint();
    this._redLagrange.addPoint();

    this._greenLagrange = new Lagrange();
    this._greenLagrange.addPoint();
    this._greenLagrange.addPoint();
    this._greenLagrange.addPoint();
    this._greenLagrange.addPoint();
    this._greenLagrange.addPoint();

    this._blueLagrange = new Lagrange();
    this._blueLagrange.addPoint();
    this._blueLagrange.addPoint();
    this._blueLagrange.addPoint();
    this._blueLagrange.addPoint();
    this._blueLagrange.addPoint();
  }
}
