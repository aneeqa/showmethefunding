import json
import urllib.request
 
# Get org data = http://gtr.rcuk.ac.uk/organisation/2512EF1C-401B-4222-9869-A770D4C5FAC7.json
# Get project data = http://gtr.rcuk.ac.uk/search/project.json?term=mouse
 
f = urllib.request.urlopen('http://gtr.rcuk.ac.uk/search/project.json?term=mouse')
s = f.read()
data = json.loads(s.decode('utf-8'))
f.close()
 
organisations = dict()
 
# Loop over projects
for project in data['results']:
    project = project['projectComposition']

    orgid = project['leadResearchOrganisation']['id']

    details = {
        "title" : project['project']['title'],
        "funder" : project['project']['fund']['funder']['name'],
        "amount" : project['project']['fund']['valuePounds'],
        "start" : project['project']['fund']['start'],
    }
    
    if 'status' in project['project']:
        details["status"] = project['project']['status']

    if 'end' in project['project']['fund']:
        details["end"] = project['project']['fund']['end']

    if 'abstractText' in project['project']:
        details["abstract"] = project['project']['abstractText']

    if orgid not in organisations:
        organisations[orgid] = list()
    
    organisations[orgid].append(details)
 
#    print "%s gave %d pounds to %s for '%s'\n" % (funder, pounds, fundee, title)

results = list()
 
for organisation in organisations.keys():
    f = urllib.request.urlopen('http://gtr.rcuk.ac.uk/organisation/%s.json' % organisation)
    s = f.read()
    data = json.loads(s.decode('utf-8'))
    f.close()
 
    data = data['organisationOverview']['organisation']

    postcode = data['address']['postCode']

    f = urllib.request.urlopen('http://uk-postcodes.com/postcode/%s.json' % postcode.replace(" ", ""))
    s = f.read()
    postcodedata = json.loads(s.decode('utf-8'))
    f.close()


    try:
        establishment = {
            "orgname" : data['name'],
            #"postCode" : postcode,
            "projects" : organisations[organisation],
            "lat" : postcodedata['geo']['lat'],
            "lon" : postcodedata['geo']['lng']
            
        }
        
        results.append(establishment)
    except KeyError:
        #print "%s has something missing, maybe address?" % (organisation)
        pass

    



print(json.dumps(results, indent=2))

#print(megastring)

#megastring should be formatted as
#a JSON array (or, at least, it's punctuated
#to the piece of paper I was given)

#problems:
#do I actually need the 'funder' thingy
#takes a realy long time to run
