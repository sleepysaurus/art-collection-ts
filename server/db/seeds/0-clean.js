exports.seed = (knex) => {
  return knex('art')
    .del()
    // .then(() => knex('locations').del()) // other table goes here if applicable
}