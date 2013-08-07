#all of this extracts the data straight from the
#html, and it should end up as raw output (not
#actually in a text file, but I can change that if
#needed) still with the html coding in it (again,
#that can be changed).

def all_data(project_id):
    #project id has to be inputted as a string
    import urllib.request

    u = "http://gtr.rcuk.ac.uk/project/" + project_id
    f = urllib.request.urlopen(u)
    html = f.read()
    contents = str(html)
    f.close()

    results = []

    def extract(start, finish, start2=''):
        i = (contents.find(start, 0))
        i = i+len(start)
        if start2!='':
            i = (contents.find(start2, i))
            i = i+len(start2)
        j = contents.find(finish, i)
        data = contents[(i):(j)]
        results.append(data)
        return data

    #variables here aren't strictly necessary, but it's easier this way
    project_title = extract('<div id="detail-title">', '</h1>')

    lead_research_organisation = extract('Lead Research Organisation:', '</h2>')
    #possibly get rid of link here - leads to other things by orgaisation on GtR website
    abstract = extract('<div id="abstract">', '</div>')

    funded_value = extract('<h4 id="totalFund" >', '</div>')
    #may wish to add '&pound' as start2 argument if pound sign not wanted. also may need to extract as integer
    funded_period = extract('<h5>Funded Period:</h5>', '</p>')
    #I don't even know on this one.  may need to extract differently depending on what is wanted
    funder = extract('<h5>Funder:</h5>', '</p>', '<p>')
    #start2 value set at '<p>'to get the next line only rather than the paragraph break as well
    project_status = extract('<h5>Project Status:</h5>', '</div>')

    grant_category = extract('<h5>Grant Category:</h5>', '</p>', '<p>')
    #same start2 as for funder
    grant_reference = extract('<h5>Grant Reference:</h5>', '</p>', '<p>')
    #see above for start2 value
    principal_investigator = extract('<h5>Principal Investigator:</h5>', '</div>')
    #possibly get rid of link here again for same reasons

    #I'm completely ignoring 'impact' as not only is it not on all
    #items, but for the things that it actually is on, they're
    #completely random as to the type of content, so it would be
    #impossible to extract the data easily via my functions

    return results


