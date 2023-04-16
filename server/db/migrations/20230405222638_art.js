exports.up = (knex) => {
  return knex.schema.createTable('art', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('image')
    table.string('text')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('art')
}