//DESAFIO:

console.log("");

console.log("Desafío");

console.log("");

import { ListadoPrecios, Reserva2, reservas2 } from "./0_constantes";

class CalculoReserva {
  reservas: Reserva2[];
  iva: number = 21;
  _subtotal: number = 0;

  _precio: ListadoPrecios = {
    standard: 100,
    suite: 150,
  };

  constructor(reservas: Reserva2[]) {
    this.reservas = reservas;
  }

  suplementoDesayuno(reserva: Reserva2): number {
    return reserva.desayuno ? 15 * reserva.pax * reserva.noches : 0;
  }

  suplementoPersonas(reserva: Reserva2): number {
    return reserva.pax > 1 ? 40 * (reserva.pax - 1) * reserva.noches : 0;
  }

  sumaSuplementos(reserva: Reserva2): number {
    return this.suplementoPersonas(reserva) + this.suplementoDesayuno(reserva);
  }

  precioHabitacion(reserva: Reserva2, _precio: ListadoPrecios): number {
    return reserva.tipoHabitacion === "suite"
      ? _precio.suite
      : _precio.standard;
  }

  reservaIndividual(reserva: Reserva2) {
    return (
      this.precioHabitacion(reserva, this._precio) *
        reserva.pax *
        reserva.noches +
      this.sumaSuplementos(reserva)
    );
  }

  get subtotal(): number {
    return reservas2.reduce(
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

class ClienteParticular extends CalculoReserva {}

class ClienteTourOperador extends CalculoReserva {
  descuento: number = 15;
  precioHabitacion(): number {
    return 100;
  }

  get subtotal(): number {
    return super.subtotal - (this.descuento * super.subtotal) / 100;
  }
}

const particular2 = new ClienteParticular(reservas2);

const operadorDesafio = new ClienteTourOperador(reservas2);

console.log(
  `El total de las reservas sin IVA para el cliente particular es ${particular2.subtotal} euros`
);

console.log(`El total con IVA es ${particular2.total} euros`);

console.log(
  `El total de las reservas sin IVA para el tour operador es ${operadorDesafio.subtotal} euros`
);

console.log(`El total con IVA es ${operadorDesafio.total} euros`);
