class DecoradorFactura extends FacturaElectronica {
    constructor(facturaBase) {
        super(facturaBase.generador);
        this.facturaBase = facturaBase;
    }
    
    setGenerador(generador) {
        this.generador = generador;
        if (this.facturaBase.setGenerador) {
          this.facturaBase.setGenerador(generador);
        }
      }
    
    prepararDatos(datos) {
        return this.facturaBase.prepararDatos(datos);
    }
    
    generarFactura(datos) {
        return this.facturaBase.generarFactura(datos);
    }
}