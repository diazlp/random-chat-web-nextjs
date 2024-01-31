import { useEffect } from 'react';
import { useDispatch } from '@/store/store';
import Peer from 'peerjs';
import { setPeerId, setPeerInstance } from '@/store/slices/peerSlice';

const usePeer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Peer connection
    if (typeof window !== 'undefined') {
      const _peer = new Peer({
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
      _peer.on('open', (peerId: string) => {
        dispatch(setPeerId(peerId));
        console.log(`Connected to PeerServer with ID: ${peerId}`);
      });

      // Peer error event
      _peer.on('error', (err) => {
        console.error('Peer error:', err);
      });

      dispatch(setPeerInstance(_peer));

      // Clean up Peer connection on component unmount
      return () => {
        if (_peer) {
          _peer.destroy();
        }
      };
    }
  }, [dispatch]);

  return null;
};

export default usePeer;
