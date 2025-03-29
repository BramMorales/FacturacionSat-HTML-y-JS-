class FacturaElectronica {
  constructor(generador) {
      if (new.target === FacturaElectronica) {
          throw new Error("No se puede instanciar una clase abstracta");
      }
      this.generador = generador;
  }

  setGenerador(generador) {
      this.generador = generador;
  }

  generarFactura() {
      throw new Error("Método abstracto no implementado");
  }
}