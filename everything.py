import json
import urllib.request
import cgitb
cgitb.enable()

print("Content-Type: application/json")     
print()                              

 
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
            "projects" : organisations[organisation],
            "lat" : postcodedata['geo']['lat'],
            "lon" : postcodedata['geo']['lng']
            
        }
        
        results.append(establishment)
    except KeyError:

        pass

    



print(json.dumps(results))

