import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    image: { type: String, required: true },
  }, {
    timestamps: true
  });

const Evento = mongoose.model('Evento', eventoSchema);

export default Evento;