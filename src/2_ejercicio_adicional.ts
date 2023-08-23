//EJERCICIO ADICIONAL:

console.log("");

console.log("Ejercicio adicional");

console.log("");

import { ListadoPrecios, Reserva, reservas } from "./0_constantes";

class CalculoReserva {
  reservas: Reserva[];
  _iva: number = 21;

  _precio: ListadoPrecios = {
    standard: 100,
    suite: 150,
  };

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  suplementoPersonasExtra(reserva: Reserva): number {
    return reserva.pax > 1 ? 40 * (reserva.pax - 1) * reserva.noches : 0;
  }

  precioHabitacion(reserva: Reserva, _precio: ListadoPrecios): number {
    return reserva.tipoHabitacion === "suite"
      ? _precio.suite
      : _precio.standard;
  }

  reservaIndividual(reserva: Reserva) {
    return (
      this.precioHabitacion(reserva, this._precio) * reserva.noches +
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
      (this.subtotal + (this.subtotal * this._iva) / 100).toFixed(2)
    );
  }
}

class ClienteParticular extends CalculoReserva {}

class ClienteTourOperador extends CalculoReserva {
  _descuento: number = 15;

  precioHabitacion(): number {
    return 100;
  }

  get subtotal(): number {
    return super.subtotal - (this._descuento * super.subtotal) / 100;
  }
}

const particular = new ClienteParticular(reservas);

const operador = new ClienteTourOperador(reservas);

console.log(
  `El total de las reservas sin IVA para el cliente particular es ${particular.subtotal} euros`
);

console.log(`El total con IVA es ${particular.total} euros`);

console.log(
  `El total de las reservas sin IVA para el tour operador es ${operador.subtotal} euros`
);

console.log(`El total con IVA es ${operador.total} euros`);
