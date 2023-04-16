import conn from './connection'

import  { DBArt } from '../../common/art'

const ART_TABLE = 'art'

export function selectAllArt(db = conn): Promise<DBArt[]> {
  return db(ART_TABLE)
    .select()
}
export function selectOneArt(id: number, db = conn): Promise<DBArt> {
  return db(ART_TABLE)
    .select()
    .where('id', id)
    .first()
}

export function deleteArtwork(id: number, db = conn): Promise<number> {
  return db(ART_TABLE)
    .delete()
    .where('id', id)
}

export function insertArt(art: DBArt, db = conn): Promise<number> {
  return db(ART_TABLE)
    .insert(art)
}
