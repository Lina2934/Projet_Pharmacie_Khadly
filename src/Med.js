export default class Med {
  constructor(id, denomination, formepharmaceutique, qte, image) {
    this._id = id;
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._qte = qte;
    this._image = image;
  }

  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get formepharmaceutique() {
    return this._formepharmaceutique;
  }

  get qte() {
    return this._qte;
  }

  get image() {
    return this._image;
  }

  Affichage() {
    return `Nom : ${this._denomination}, Forme : ${this._formepharmaceutique}, Quantité : ${this._qte}`;
  }
}
