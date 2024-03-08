# python -u "d:\Appdev\mongodb\std.py"
import pymongo
from flask import Flask,request,jsonify,Response
import json
from flask_basicauth import BasicAuth
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
CORS(app, origins='*')

uri = "mongodb+srv://6530300686:6530300686_mongodb@cluster0.mc6i7mo.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = pymongo.MongoClient(uri)

# Auth
app.config['BASIC_AUTH_USERNAME'] = 'Test'
app.config['BASIC_AUTH_PASSWORD'] = 'Test123'
basic_auth = BasicAuth(app)


# Select the database and collection
# client.admin.command("ping")
# db = client["AppDev"]
# collection = db["Book"]


@app.route('/api/Insert', methods=['POST'])
# @basic_auth.required
def insert_data():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Book"]
        data = request.get_json()
        name = data.get('name')
        Qty = data.get('Qty')
        Price = data.get('Price')

        if not name or not Qty or not Price:
            return jsonify({"message": "Please fill in all fields"}), 400

        # บันทึกข้อมูลลงใน MongoDB
        new_data = {"_id": name, "name": name, "Qty": Qty, "Price": Price}
        result = collection.insert_one(new_data)
        return jsonify({"message": "Data inserted successfully", "id": name}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/Delete', methods=['DELETE'])
# @basic_auth.required
def delete_data():
    try :
        # print(id)
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Book"]
        data = request.get_json()
        name = data.get('name')
        result = collection.delete_one({"_id": name})
        if result.deleted_count > 0:
            return jsonify({"message": "Data deleted successfully"}), 200
        else:
            return jsonify({"message": "Data not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/api/Update", methods=["PUT"])
# @basic_auth.required
def update_data():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Book"]
        req_data = request.get_json()
        name = req_data.get("name")
        id = req_data.get("id")
        Qty = req_data.get("Qty")
        Price = req_data.get("Price")
        print(req_data)
        result = collection.update_one(
            {"_id": id},
            {"$set": {"name": name, "Qty": Qty, "Price": Price}}
        )
        if result.matched_count > 0:
            return jsonify({"message": "Data updated successfully"}), 200
        else:
            return jsonify({"error": "Data not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/tabledata", methods=["GET"])
# @basic_auth.required
def get_table_data():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Book"]
        table_head = [{"id": "name", "label": "Name", "minWidth": 170, "align": "center"},
                    {"id": "Qty", "label": "Qty", "minWidth": 100, "align": "center"},
                    {"id": "Price", "label": "Price", "minWidth": 170, "align": "center"},
                    {"id": "Update", "label": "Update", "minWidth": 170, "align": "center"},
                    { "id": "Delete", "label": "Delete", "minWidth": 170, "align": "center"}]
        table_body = []
        for item in collection.find():
            table_body.append({"id": item["_id"], "name": item["name"], "Qty": item["Qty"], "Price": item["Price"]})
        return jsonify({"tableHead": table_head, "tableBody": table_body})
    except Exception as e :
        print(e)
        return Response (
        response = json.dumps({"error":"Cannot Connect DB"}),
        status = 404 ,
        mimetype = "application/json"
        )

if (__name__ == "__main__") :
    app.run(debug=True, port=5001, host='0.0.0.0')


