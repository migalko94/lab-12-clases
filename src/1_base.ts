import { Reserva, reservas } from "./0_constantes";
import "./style.css";

//CASOS 1 Y 2:

console.log("");

console.log("Casos 1 y 2");

console.log("");

class CalculoParticular {
  reservas: Reserva[];
  iva: number = 21;

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  suplementoPersonasExtra(reserva: Reserva): number {
    return reserva.pax > 1 ? 40 * (reserva.pax - 1) * reserva.noches : 0;
  }

  precioHabitacion(reserva: Reserva): number {
    return reserva.tipoHabitacion === "suite" ? 150 : 100;
  }

  reservaIndividual(reserva: Reserva) {
    return (
      this.precioHabitacion(reserva) * reserva.pax * reserva.noches +
      this.suplementoPersonasExtra(reserva)
    );
  }

  get subtotal(): number {
    return reservas.reduce(
      (total, reserva) => total + this.reservaIndividual(reserva),
      0
    );
  }

  get total(): number {
    return Number(
      (this.subtotal + (this.subtotal * this.iva) / 100).toFixed(2)
    );
  }
}

class ReservaTourOperador extends CalculoParticular {
  _descuento: number = 15;

  precioHabitacion(): number {
    return 100;
  }

  get subtotal(): number {
    return super.subtotal - (this._descuento * super.subtotal) / 100;
  }
}

const clienteParticular = new CalculoParticular(reservas);

const tourOperador = new ReservaTourOperador(reservas);

console.log(
  `El total de las reservas sin IVA para el cliente particular es ${clienteParticular.subtotal} euros`
);

console.log(`El total con IVA es ${clienteParticular.total} euros`);

console.log(
  `El total de las reservas sin IVA para el tour operador es ${tourOperador.subtotal} euros`
);

console.log(`El total con IVA es ${tourOperador.total} euros`);
