
let itemCollection;

class Item {
  constructor(input_data, username) {
    this.data = input_data;
    this.errors = [];

    this.data = {
        ...this.data,
        owner: username
    }
  }

  static async getItemCollection(client) {
    if (itemCollection) {
        return;
      }
      try {
        itemCollection = await client.db("BruinTrade").collection("items");
      } catch (error) {
        console.log(error);
      }
  }

  clean() {

  }

  validate() {

  }

  async create() {
    return new Promise((resolve, reject)=>{
        //this.clean()
        //this.validate()
        itemCollection.insertOne(this.data).then(()=>{
            resolve("successfully created item")
        }).catch(() => {
            reject("failed to create item")
        })
    })
  }
}

export default Item