import { useEffect, useState } from 'react';
import Peer from 'peerjs';

const usePeer = () => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<{ [roomId: string]: number }>({});

  useEffect(() => {
    // Initialize Peer connection
    const initializePeer = async () => {
      const peer = new Peer({
        secure: true,
        config: {
          iceServers: [
            { url: 'stun:stun.l.google.com:19302' },
            {
              url: 'turn:numb.viagenie.ca',
              credential: 'muazkh',
              username: 'webrtc@live.com',
            },
            { url: 'stun:stun1.l.google.com:19302' },
            { url: 'stun:stun2.l.google.com:19302' },
            { url: 'stun:stun3.l.google.com:19302' },
            { url: 'stun:stun4.l.google.com:19302' },
          ],
        },
      });

      // Peer open event
      peer.on('open', (peerId: string) => {
        setPeerId(peerId);
        console.log(`Connected to PeerServer with ID: ${peerId}`);
      });

      // Peer error event
      peer.on('error', (err) => {
        console.error('Peer error:', err);
      });

      setPeer(peer);
    };

    initializePeer();

    // Clean up Peer connection on component unmount
    return () => {
      if (peer) {
        peer.destroy();
      }
    };
  }, []);

  // useEffect(() => {
  //   // Join or create a room based on the current state
  //   const joinOrCreateRoom = (peer: Peer, roomId: string) => {
  //     const clientsInRoom = rooms[roomId] || 0;

  //     if (clientsInRoom === 0 || clientsInRoom === 2) {
  //       // Create a new room if no room or all rooms already have 2 people
  //       const newRoomId = peer.id + Date.now();
  //       peer.joinRoom(newRoomId);
  //       setRooms({ ...rooms, [newRoomId]: 1 });
  //     } else {
  //       // Join an existing room
  //       peer.joinRoom(roomId);
  //       setRooms({ ...rooms, [roomId]: clientsInRoom + 1 });
  //     }
  //   };

  //   // Handle connection event
  //   peer?.on('connection', (conn) => {
  //     const roomId = conn.metadata.roomId;
  //     joinOrCreateRoom(peer, roomId);
  //   });

  //   return () => {
  //     if (peer) {
  //       peer.destroy();
  //     }
  //   };
  // }, [rooms, peer]);

  return {
    peer,
    peerId,
  };
};

export default usePeer;
