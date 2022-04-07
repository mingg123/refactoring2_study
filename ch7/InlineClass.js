//리팩토링 전
class TrackingInformation {
  get shippingCompany() {
    return this._shippingCompany;
  }
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
  get trackingNumber() {
    return this._trackingNumber;
  }
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
  get display() {
    return `${this.shippingCompany}`;
  }
}

class Shipment {
  get trackingInfo() {
    return this._trackingInfomation.display;
  }

  get trackingInformation() {
    return this._trackingInfomation;
  }
  set trackingInfomation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}
//리팩토링 후
class Shipment {
  get shippingCompany() {
    return this._shippingCompany;
  }
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }

  get trackingNumber() {
    return this._trackingNumber;
  }
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
  get trackingInfo() {
    return this._trackingInfomation.display;
  }

  get trackingInformation() {
    return this._trackingInfomation;
  }
  set trackingInfomation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}
