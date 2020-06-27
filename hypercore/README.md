sharing learning and understanding on the data hypercore protocols

hypercore
=========

peer to peer append log with crypto guarantees

basic use and discovery of share topic use case

replication of hypercore logs peer to peer

key learning on replication is to watch the forming of key from peer 1 in peer 2 script and note this need to be in Buffer format as show in code.

There is a one way flow of replication from peer1 on to peer2 log store.  ie if you tried to write from peer2 to peer1 and save in peer1 log store this would not work.

Overall tip.  The tests in the protocol give examples in a single file.  The split those test out into a more realistic two script setup.
