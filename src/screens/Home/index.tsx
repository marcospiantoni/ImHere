import {Text, TextInput, View, TouchableOpacity, FlatList, Alert} from 'react-native'
import { Participant } from '../../components/Participant'

import {styles} from './styles'

export function Home() {
  const participants = ['Marcos Piantoni','Giovanna Sayuri', 'Guilherme Augusto','Belle Perri', 'Lucas Cabral', 'Debora Duarte', 'Guilherme Brugineri', 'Luana Franco', 'Cauê Batista', 'Brenda Ventura'  ]
  
  function handleParticipanAdd() {
    if (participants.includes('Marcos Piantoni')) {
      return Alert.alert('Participante já cadastrado', 'Já existe um participante na liste com esse nome.')
    }
    console.log('Você adicionou um participante!')
  }

  function handleParticipanRemove(name: string) {
    Alert.alert('Remover', `Deseja remover ${name} da lista?`, [
      {
        text: 'Sim',
        onPress: () => Alert.alert('Removido!')
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
    console.log(`Você removeu um participante ${name}!`)
  }

  return (
   <View style={styles.container}>
     <Text style={styles.eventName}> 
       Nome do Evento 
     </Text>

     <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2023 
     </Text>
   
    <View style={styles.form}>
     <TextInput 
      style={styles.input}
      placeholder='Nome do participante'
      placeholderTextColor='#6B6B6B'
     />
     
     <TouchableOpacity style={styles.button} onPress={handleParticipanAdd}>
       <Text style={styles.buttonText}>
         +
       </Text>
     </TouchableOpacity>
    </View>
    
    <FlatList
     data={participants}
     keyExtractor={item => item}
     renderItem={({item}) => (
      <Participant 
        key={item}
        name={item}
        onRemove={() => handleParticipanRemove(item)}
      />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
        </Text>
      )}
     />
   </View>
  )
}