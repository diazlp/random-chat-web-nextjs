/**
 * Retrieves the score of a player based on their client ID from the list of players.
 * @param players - An array of player objects containing client IDs and scores.
 * @param clientId - The client ID of the player whose score needs to be retrieved.
 * @param excludeCurrentPlayer - Optional flag to exclude the current player from consideration.
 * @returns The score of the specified player. If the player is not found, returns 0.
 */
const getPlayerScore = (
  players: any,
  clientId: string,
  excludeCurrentPlayer = false
) => {
  const player = players.find((p: { clientId: string; scores: number }) =>
    excludeCurrentPlayer ? p.clientId !== clientId : p.clientId === clientId
  );
  return player ? player.scores : 0;
};

export default getPlayerScore;
