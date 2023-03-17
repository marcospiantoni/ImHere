import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Participant } from "../../components/Participant";
import { Octicons } from "@expo/vector-icons";

import { styles } from "./styles";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipanAdd() {
    if (participantName.length <= 1) {
      return Alert.alert(
        "Caractere inválido",
        "O nome digitado deve ter no mínimo dois caracteres"
      );
    }
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante já cadastrado",
        "Já existe um participante na liste com esse nome."
      );
    } else {
      setParticipants((prevState) => [...prevState, participantName]);
      setParticipantName("");
    }
  }

  function handleParticipanRemove(name: string) {
    Alert.alert("Remover", `Deseja remover ${name} da lista?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participants) => participants !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.eventIconName}>
        <TextInput
          style={styles.eventName}
          placeholder="Nome do evento"
          placeholderTextColor="#FFF"
        ></TextInput>
        <Octicons name="pencil" size={24} color="#6B6B6B" />
      </View>

      <View style={styles.eventIconDate}>
        <TextInput
          placeholder="Data e hora do evento"
          style={styles.eventDate}
          placeholderTextColor="#FFF"
        ></TextInput>
        <Octicons name="pencil" size={12} color="#6B6B6B" />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipanAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipanRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença.
          </Text>
        )}
      />
    </View>
  );
}
