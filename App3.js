import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db2.db')

const tables = [
  `CREATE TABLE IF NOT EXISTS brand (
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    removed INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY NOT NULL,
    brandId INTEGER NOT NULL,
    name TEXT NOT NULL,
    notes TEXT,
    rating INTEGER,
    image TEXT,
    removed INTEGER  DEFAULT 0
  )`
]

const listUser = [{"id":1,"name":"yeison"},{"id":2,"name":"andres"}];

export default class App extends Component {
  
  state = {
    logs: []
  }
  
  // I did this because I have no idea how to see logs
  // for snacks
  log(...msg) {
    this.setState({
      logs: [...this.state.logs, ...msg],
    })
  }
  
   componentDidMount() {
    this.ejecutar();
   
  }

  async ejecutar(){
    //this.log('ejecutar');
   let listUsers= this.getUsers().then((res)=>console.log(res));
  console.log('ejecutar',listUsers);
  }

  
   getUsers(){
     return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(listUser);
      },2000)
     })

  }

  async longTransaction() {
    await new Promise((resolve, reject) => {
      db.transaction(
        async (tx) => {
        
            console.log('select brand')
           const listBrand = await new Promise( (resolve, reject) => {
              // This query never executes
               tx.executeSql(
                'select * from brand',
                [],
                (_, { rows: { _array } }) => {
                  //console.log('finished select a brand',_array)
                  resolve(_array)
                },
                (_, error) => {
                  this.log('error select a brand')
                  reject(error)
                }
              )
            })

            
            //  select product by brand for
            this.log('select brand',listBrand);
            
           const listall= await new Promise( (resolve, reject) => {           
                  console.log('antes de la ejecucion priducto');
               tx.executeSql(
                'select * from product ',
                [],
                (_, { rows: { _array } }) => {
                 // this.log('finished select a product') ;
                  console.log(' for tx');
                  
                  resolve(_array);
                },
                (_, error) => {
                  console.log('error select a product')        
                  reject(error)        
                }
              )
            })
            console.log('list all',listall);

        },

        // transaction error callback
        (...args) => {
          this.log('trans finished error', ...args)
          reject(args)
        },
        // transaction success callback
        (...args) => {
          this.log('trans finished success', ...args)
          resolve(args)
        }
      )
    })
    this.log("hello world")
  }

   dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'select * from product ',
          [],
          (_, { rows: { _array } }) => { resolve(array) },
          (_, error) => { console.log("error select product table"); reject(error)
          }
        )
      })
    })
  }

  async loadProduct(list) {
     return  new Promise((resolve, reject) => {
      db.transaction(
        async (tx) => {                    
            this.log('select brand',list);            
           const listall= await new Promise( (resolve, reject) => {           
                  console.log('antes de la ejecucion priducto');
               tx.executeSql(
                'select * from product ',
                [],
                (_, { rows: { _array } }) => {
                 // this.log('finished select a product') ;
                  console.log(' for tx');                  
                  resolve(_array);
                },
                (_, error) => {
                  console.log('error select a product')        
                  reject(error)        
                }
              )
            })
            console.log('list all',listall);

        },

        // transaction error callback
        (...args) => {
          this.log('trans product finished error', ...args)
          reject(args)
        },
        // transaction success callback
        (...args) => {
          this.log('trans product finished success', ...args)
          resolve(args)
        }
      )
    })
    this.log("hello world")
  }
  
  async longTransaction2() {
    await new Promise((resolve, reject) => {
      db.transaction(
        async (tx) => {
          // This gives an error because product table was never created
          // tx.executeSql('select * from product', [], (_, results) => {
          //   this.log(results)
          // })
          this.log('creating brand table')
         const table_brand= await new Promise((resolve, reject) => {
            tx.executeSql(
              tables[0],
              [],
              (_, result) => {
                this.log('finished creating brand table')
                resolve(result)
              },
              (_, error) => {
                this.log('error creating brand table')
                reject(error)
              }
            )
          })

          console.log('return table_brand',table_brand);
          this.log('creating product table')
          await new Promise((resolve, reject) => {
            this.log('can you see this log?')
            // This query never executes
            tx.executeSql(
              tables[1],
              [],
              (_, result) => {
                this.log('finished creating product table')
                resolve(result)
              },
              (_, error) => {
                this.log('error creating product table')
                reject(error)
              }
            )
          })

          // You can't see this log
          this.log('you can\'t see that i\'m trying to create a brand')
          await new Promise((resolve, reject) => {
            // This query never executes
            tx.executeSql(
              'insert into brand (name) values (?)',
              ['awesome'],
              (_, result) => {
                this.log('finished adding a brand')
                resolve(result)
              },
              (_, error) => {
                this.log('error adding a brand')
                reject(error)
              }
            )
          })
        },
        // transaction error callback
        (...args) => {
          this.log('trans finished error', ...args)
          reject(args)
        },
        // transaction success callback
        (...args) => {
          this.log('trans finished success', ...args)
          resolve(args)
        }
      )
    })
    this.log("hello world")
  }
  
  render() {
    return <ScrollView style={{ padding: 20 }}>
      <View style={{ height: 40 }} />
      <Text>{this.state.logs.join('\n\n')}</Text>
      <Button title="Registro" bordered onPress={this.ejecutar}/>
     
    </ScrollView>
  }
}
