import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text ,ScrollView,Button} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db2.db');

const listUser = [{"id":1,"name":"yeison"},{"id":2,"name":"andres"}];
const listCity = [{"id":1,"name":"Popayan"},{"id":2,"name":"Cali"}];

export default function App(props) {

const ejecutar = async ()=>{
  //let listUsers= getUsers().then((res)=>console.log(res));
  let listBrand= await getBrand();
  let listProduct= await getProduct(listBrand);
 
  //console.log('lista de listBrand',listBrand);
  console.log('lista de listProduct',listProduct);
  
};

    return (
      <ScrollView style={{ padding: 20 }}>
      <View style={{ height: 40 }} />
      <Text>fgdfg</Text>
      <Button title="Registro" bordered onPress={ejecutar}/>
     
    </ScrollView>
    );
 
}

async function getProduct(listBrand){
  return new Promise(async(resolve, reject)=>{
    for (const item of listBrand) {         
      //console.log('for',item.id, item.name);
      item.listProduct = await getListProducByBrand(1);
    }
  console.log('fuera for');
    resolve(listBrand)
  })
}

function getBrand(){
  return new Promise((resolve, reject)=>{
    db.transaction(tx => {
      tx.executeSql(
        'select * from brand ',
        [],
        (_, { rows: { _array } }) => { resolve(_array) },
        (_, error) => { console.log("error select product brand"); reject(error)
        }
      )
    })
  })
}


function getListProducByBrand(id){
  return new Promise((resolve, reject)=>{
    db.transaction(tx => {
      tx.executeSql(
        'select * from product ',
        [],
        (_, { rows: { _array } }) => { resolve(_array) },
        (_, error) => { console.log("error select product brand"); reject(error)
        }
      )
    })
  })
}



function getUsers(){
  return new Promise((resolve, reject)=>{
   setTimeout(()=>{
     resolve(listUser);
   },2000)
  })
}

function getCities(){
  return new Promise((resolve, reject)=>{
   setTimeout(()=>{
     resolve(listCity);
   },1000)
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f',
  }
});
