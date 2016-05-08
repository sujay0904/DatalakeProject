import json
from pprint import pprint
from pymongo import MongoClient
import sys
import os



s= sys.argv[1]
base=os.path.basename(s)
filename = os.path.splitext(base)[0]
f = open(s,"r")

lines = f.readlines()
num_lines = sum(1 for line in open(s))
print num_lines
last = lines[-1]

client = MongoClient('localhost:27017')
db1 = client.cis550

listID = 0
mapID = 0
listobj = 0

    

def printKeyVals(key,val):
	global id
	global listID
	global mapID
	global listobj

    	if isinstance(val, list):
    		id = id+1
		listID = listID+1
		f.write( '"'+str(id)+'"' + ' : { ' )
   		f.write( '"'+key+'"' + ' : [' )

		if(len(val)!=0 and isinstance(val[0], list) == False and isinstance(val[0], dict) == False):
			listobj = 1
			result = db1.node.insert_one({"node_id": str(id), "key":str(key), "value": val, "root":str(root)})

		else:
			listobj=0
			result = db1.node.insert_one({"node_id": str(id), "key":str(key), "value":"list"+str(listID), "root":str(root)})

		if(len(val)==0):
			f.write("]}")
			return

   		printKeyVals(key,val[0])
		val = val[1:]

    		for each in val:
    			f.write(" , ")		
    			printKeyVals(key,each)

		f.write(" ] } ")
		listobj=0


    	elif isinstance (val, dict):
		
    		id = id+1
		f.write('"'+str(id)+'"'+' : { ')
    		f.write('"'+key+'"'+ ' : {')

		mapID = mapID+1
		result = db1.node.insert_one({"node_id": str(id), "key":str(key), "value":"map"+str(mapID), "root":str(root)})

		if(len(val)==0):
			f.write("}}")
			return
		i = len(val)
		
    		for k,v in val.iteritems():
    			#id generation
			i = i-1

			if ( (isinstance(v, list) == False) and (isinstance(v,dict) == False) ) :
				id=id+1
				f.write('"'+str(id)+'"' + ' : {  ')
				f.write('"' + k + '"'+ " :")
				
    			printKeyVals(k,v)

			if(isinstance(v,dict) == False):
				f.write(" } ")

			if(i!=0):
				f.write(" , ")

		f.write("}")
    		f.write(" } ")

	else:
		if(isinstance(val,basestring)==False) :
			f.write('"'+str(val)+'"')

			result = db1.node.insert_one({"node_id": str(id), "key":str(key), "value":str(val), "root":str(root)})

		else:
			dummyval = val.encode('ascii','ignore')
			dummyval = dummyval.replace('\n',' ')
			dummyval = dummyval.replace('"','')
			f.write('"'+ dummyval.lower()+'"')
			if(listobj!=1):
				result = db1.node.insert_one({"node_id": str(id), "key":str(key), "value": dummyval, "root":str(root)})


i = int(sys.argv[2])
id = long(i)
f= open("new.json","w")
f.write("")
f.close()
f = open("new.json","a")
id = id+1
root = id
f.write(' { '+ '"'+str(id)+'"' +' : '+' { ' '"'+filename+'"'+' : ')
f.write('\n { ')

result = db1.node.insert_one({"node_id": str(root), "key":str(filename), "value":"file", "root":str(root)})

for data_line in lines:
	data_line.replace('\n', ' ')
	data_file = data_line.encode('ascii','ignore')   
	data = json.loads(data_file)
	
	
	i = len(data.keys()); 

	for key in data.keys():
		i = i-1
		if ( (isinstance(data[key], list) == False) and (isinstance(data[key],dict) == False) ) :
			id = id+1
			f.write('"'+str(id)+'"' +':{')
			f.write('"' + key + '"'+" :")

			printKeyVals(key,data[key])
			f.write('}')
	
		else:
			printKeyVals(key,data[key]);

		if(i!=0):
			f.write(' , ')

	if(data_line != lines[-1]):
		f.write(','+'\n ')

	else :
		f.write('} \n')

f.write(' } }\n')
f.close()
db = client.test
with open('./new.json') as json_read:
	upload = json.load(json_read)
result = db.test.insert_one(upload)
print id

 

