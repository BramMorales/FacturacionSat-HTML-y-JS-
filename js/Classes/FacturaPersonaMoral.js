class FacturaPersonaMoral extends FacturaElectronica {
  constructor(generador, rfc) {
      super(generador);
      this.rfc = rfc;
  }

  generarFactura(datos) {
      const datosCompletos = {
          ...datos,
          tipo: "Persona Moral",
          rfc: this.rfc
      };
      return this.generador.generar(datosCompletos);
  }
}