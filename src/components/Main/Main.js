import React, {Component} from 'react'
import axios from 'axios'

import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

import Error from '../../hoc/Error'
import Aux from '../../hoc/Aux'

import {connect} from 'react-redux'

import MainItem from './MainItem'

import allMembers from '../../assets/images/allMembers.svg'
import Active from '../../assets/images/Active.svg'
import nonActive from '../../assets/images/nonActive.svg'
import Events from '../../assets/images/Events.svg'

class Main extends Component {

    state = {
    items: [                                                                        // prikazuje statistiku

        {value: 'all', name: 'svih članova', url: 'http://desk.uhb-rh.com/assets/peopleMain.png', path: '/membership', img: allMembers},
        {value: 'active', name: 'aktivnih članova', url: 'http://desk.uhb-rh.com/assets/peopleMain.png', path: '/members', img: Active},
        {value: 'deactive', name: 'neaktivnih članova', url: 'http://desk.uhb-rh.com/assets/deactive.png', path: '/passive', img: nonActive},
        {value: 'events', name: 'događaja', url: 'http://desk.uhb-rh.com/assets/calendarMain.png', path: '/clubs', img: Events}
    ],
    members: [],
    events: [],
    form: [],
    activeValue: 'da',
    deactiveValue: 'ne',
    membershipValue: 'ne',
    error: false,
    inputOnChange: '',
    finalAll: [],
    dataPie: [],
    fetchedQualifications: [],
    didMount: false
    }


    componentDidMount () {

        

        axios.all([
            axios.get('https://udruga-desk.firebaseio.com/member.json?auth=' + this.props.isAuth),
            axios.get('https://udruga-desk.firebaseio.com/events.json?auth=' + this.props.isAuth),
            axios.get('https://udruga-desk.firebaseio.com/form/county.json?auth=' + this.props.isAuth),
            axios.get('https://udruga-desk.firebaseio.com/form/qualifications.json?auth=' + this.props.isAuth)
          ])
          .then(response => {

            const fetchedMembers = []
            for(let key in response[0].data) {                                 // iz beckenda dobivam object pa ga moram pretvorit u array
                fetchedMembers.push({                                          // key je id tj odredeni member
                    ...response[0].data[key],
                    id: key
                
                }) 
            }

    

                         
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
        let yyyy = today.getFullYear();

        today =  yyyy + '/' + mm + '/' + dd; 

        let nowDate = new Date(today)


        for(let key = 0; key < fetchedMembers.length; key++){

            let splitDate = fetchedMembers[key].lastMembership ? fetchedMembers[key].lastMembership : fetchedMembers[key].date.split('.').reverse().join('/')
            let newDate = new Date(splitDate)

            let sumDate = nowDate - newDate

            let finalResult = sumDate/8.64e+7




            if(finalResult === 30){                                                     // mjesecna clanarina ili godisnja 

                    
                
            axios.put('https://udruga-desk.firebaseio.com/member/' + fetchedMembers[key].id + '.json',{
                cardNum: fetchedMembers[key].cardNum,
                imgUrl: fetchedMembers[key].imgUrl,
                name: fetchedMembers[key].name,
                surname: fetchedMembers[key].surname,
                oib: fetchedMembers[key].oib,
                sex: fetchedMembers[key].sex,
                birthdate: fetchedMembers[key].birthdate,
                stateOfBirth: fetchedMembers[key].stateOfBirth,
                county: fetchedMembers[key].county,
                city: fetchedMembers[key].city, 	// ukoliko je value true onda ga ispisi inace ispisi: /
                township: fetchedMembers[key].township,
                address: fetchedMembers[key].address,
                zipCode: fetchedMembers[key].zipCode,
                tel: fetchedMembers[key].tel,
                email: fetchedMembers[key].email,
                qualifications: fetchedMembers[key].qualifications,
                //status: stateAll.status.value,
                professionalTitle: fetchedMembers[key].professionalTitle,
                study: fetchedMembers[key].study,
                employment: fetchedMembers[key].employment,
                pensioner: fetchedMembers[key].pensioner,
                nogomet: fetchedMembers[key].nogomet,
                ribolov: fetchedMembers[key].ribolov,
                bela: fetchedMembers[key].bela,
                pikado: fetchedMembers[key].pikado,
                humanitarian: fetchedMembers[key].humanitarian,
                assembly: fetchedMembers[key].assembly,
                centralCommittee: fetchedMembers[key].centralCommittee,
                presidency: fetchedMembers[key].presidency, 
                president: fetchedMembers[key].president,
                vicePresident: fetchedMembers[key].vicePresident,
                secretary: fetchedMembers[key].secretary,
                supervisoryBoard: fetchedMembers[key].supervisoryBoard,
                active: 'Ne',
                date: fetchedMembers[key].date,
                lastMembership: fetchedMembers[key].lastMembership
            }).then(response => {

            }).catch(error => {
                    if(error) {
                    this.setState({error: true});
                    }
                });      
                    }
                }




            const fetchedEvents = []
            for(let key in response[1].data) {                                 
                fetchedEvents.push({                                          
                    ...response[1].data[key],
                    id: key
                
                }) 
            }

            const fetchedForm = []
            for(let key in response[2].data) {                                 
                fetchedForm.push({                                          
                    ...response[2].data[key],
                    id: key
                
                }) 
            }

            const fetchedQualifications = []
            for(let key in response[3].data) {                                 
                fetchedQualifications.push({                                          
                    ...response[3].data[key],
                    id: key
                
                }) 
            }


            this.setState({members:fetchedMembers, events: fetchedEvents, form: fetchedForm, finalAll: fetchedForm, fetchedQualifications: fetchedQualifications});
 
          })
          .catch(error => {
            this.setState({error: true});
          });

    

    }

  
componentDidUpdate(prevProps, prevState){

    
setInterval(() => {

    if(!this.state.didMount){
        axios.all([
            axios.get('https://udruga-desk.firebaseio.com/member.json?auth=' + this.props.isAuth)
          ])
          .then(response => {
    
            const fetchedMembers = []
            for(let key in response[0].data) {                                 // iz beckenda dobivam object pa ga moram pretvorit u array
                fetchedMembers.push({                                          // key je id tj odredeni member
                    ...response[0].data[key],
                    id: key
                
                }) 
    
            }
          this.setState({members: fetchedMembers, didMount: true})
        })
    }
   
}, 500); 
 

}


    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    inputOnChange = (e) => {

        this.setState({[e.target.name]:e.target.value}) 
    
    }


    valueSelected = (e, i) => {
        

        if(this.state.dataPie.length === 0){

            let aa = []
            aa.push(i)

            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            
            let addValues

            for(let key in aa) {
                addValues = {
                    ...aa,
                    [key]:{
                        ...aa[key],
                        id: aa[key].displayValue,
                        label: aa[key].displayValue,
                        value: aa[key].members.length,
                        color: color,
                        num: key,
                        country: aa[key].displayValue
                    }
                }
            }

            this.setState({
                dataPie: Object.values(addValues) 
            })

        } else {

 

            let aa = []
            for(let key in this.state.dataPie){
                aa.push(
                    ...this.state.dataPie, 
                    this.state.dataPie[key].displayValue !== i.displayValue ? i : null
                    )
            }

            let fetchFilter = []
            fetchFilter = aa.filter(function (el) {// filtrira one koji nisu null
                return el != null;
                });

            let pushElClean = []

            pushElClean = fetchFilter.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.displayValue === thing.displayValue
            )))

            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            
            let addValues

            for(let key in pushElClean) {
                addValues = {
                    ...pushElClean,
                    [key]:{
                        ...pushElClean[key],
                        id: pushElClean[key].displayValue,
                        label: pushElClean[key].displayValue,
                        value: pushElClean[key].members.length,
                        color: color,
                        num: key,
                        country: pushElClean[key].displayValue,

                    }
                }
            }
            


            this.setState({
                dataPie: Object.values(addValues) 

            })   
        }           
    }


    resetBtn = () => {

        this.setState({dataPie: []})

    }

    removeBar = (e,num) => {
        
        let update = []
        
         for(let key in this.state.dataPie){
             if([key] !== num){
                update.push(
                this.state.dataPie[key].num === num ? null : this.state.dataPie[key]
                )
         }}

         let fetch

         fetch = update.filter(function (el) {// filtrira one koji nisu null
            return el != null;
            });

        this.setState({
            dataPie: fetch
        })

        console.log(fetch)

    }


    render() {

                                                                         // filtriranje prema odredenim kategorijama - aktivni i neaktivni članovi te aktivni dogadaji 



        // koliko ima aktivnih članova

        let filteredActiveMembers = this.state.members.filter(
            (member) => {
                return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1 

            }
        )

        let activeMembersNumber = filteredActiveMembers.length 

        // koliko ima neaktivnih članova

        let filteredDeactiveMembers = this.state.members.filter(
            (member) => {
                return  member.active.toLowerCase().indexOf(this.state.deactiveValue.toLowerCase()) !== -1 

            }
        )

        let deactiveMembersNumber = filteredDeactiveMembers.length

        // koliko ima događaja

        let filteredNewEvents = this.state.events.filter(
            (event) => {
                return  event.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1 
            }
        )

        let newEventsNumber = filteredNewEvents.length

        // koliko sveukupno ima članova

        let allMembersNumber = activeMembersNumber + deactiveMembersNumber

        const item = this.state.items.map((i) => {
            return( <MainItem 
                    itemName={i.name}
                    icon={i.url}
                    key={i.name}
                    itemValue={i.value}
                    img={i.img}
                    all={allMembersNumber}
                    activeNum={activeMembersNumber}
                    deactiveNum={deactiveMembersNumber}
                    eventNum={newEventsNumber}
                    />
            )
            }
        );
                                                                    // -------------------ulazi u zupaniju i izvlaci van value
        let form = this.state.form[0]

        const formElementsArray = [];                                      
        for (let key in form) {
            formElementsArray.push(
                form[key]
                
            );
        }

        let formTwo = formElementsArray[0]

        const formElementsArrayConf = [];                                      
        for (let key in formTwo) {
            formElementsArrayConf.push(
                formTwo[key]
                
            );
        }


                                                                // -------------------ulazi u gradove i izvlaci van value
        let cityOne = []
        let fetchFilterCity = []

        for(let l = 0; l < formElementsArrayConf.length; l++){

            cityOne.push(
                formElementsArrayConf[l].city.length > 1 ? formElementsArrayConf[l].city : null
            )

            fetchFilterCity = cityOne.filter(function (el) {// filtrira one koji nisu null
                return el != null;
                });

        }
        
 
        
        let cityTwo = []
        let fetchFilterCityTwo = []

        for(let key in fetchFilterCity){

            for(let num in fetchFilterCity[key]){

                cityTwo.push(
                    fetchFilterCity[key][num]
                )
                }

                fetchFilterCityTwo = cityTwo.filter(function (el) { // filtrira one koji nisu null
                    return el.displayValue !== 'Odaberi';
                    });
    
            }
                                                                                            // -------------------ulazi u opcine i izvlaci van value
            let townshipOne = []
            let fetchFilterTownship = []
    
            for(let l = 0; l < formElementsArrayConf.length; l++){
    
                townshipOne.push(
                    formElementsArrayConf[l].township.length > 1 ? formElementsArrayConf[l].township : null
                )
    
                fetchFilterTownship = townshipOne.filter(function (el) {// filtrira one koji nisu null
                    return el != null;
                    });
    
            }

            let townshipTwo = []
            let fetchFilterTownshipTwo = []
    
            for(let key in fetchFilterTownship){
    
                for(let num in fetchFilterTownship[key]){
    
                    townshipTwo.push(
                        fetchFilterTownship[key][num]
                    )
                    }
    
                    fetchFilterTownshipTwo = townshipTwo.filter(function (el) {// filtrira one koji nisu null
                        return el.displayValue !== 'Odaberi';
                        });
        
                }           

                                                                                        // -------------------postavlja dodatno polje kod svih: "members: []"
        let formElementsArrayFinal = []

        for(let l = 0; l < formElementsArrayConf.length; l++){
          
          formElementsArrayFinal.push({
              ...formElementsArrayConf[l],
              members: []
                
          });
        }
        
        let formElementsArrayFinalCity = []

        for(let l = 0; l < fetchFilterCityTwo.length; l++){
          
            formElementsArrayFinalCity.push({
              ...fetchFilterCityTwo[l],
              members: []
              
          });
        }

        let formElementsArrayFinalTownship = []

        for(let l = 0; l < fetchFilterTownshipTwo.length; l++){
          
            formElementsArrayFinalTownship.push({
              ...fetchFilterTownshipTwo[l],
              members: []
              
          });
        }

                                                                                        // -------------------sve to stavlja u jedan array

       let filteredSearchItem = formElementsArrayFinal.concat(formElementsArrayFinalCity).concat(formElementsArrayFinalTownship)        
    

      let filteredSearchItemFULL = []                       // TU JE SVE - ZUPANIJE, GRADOVI I OPCINE

      for(let l = 0; l < filteredSearchItem.length; l++){
        
                                                                                        // -------------------svima postavlja vazeci ID broj
        filteredSearchItemFULL.push({
            ...filteredSearchItem[l],
            id: l
        });
      }
           
      let elements = []
      let pushEl = []
                     // -------------------sada ulazi u clanove i zupanije,gradove,opcine i onda ih stavalja u members ako postoje clanovpodrucjima
    let mergedData

    for(let r = 0; r < filteredSearchItemFULL.length; r++){
            
          mergedData = this.state.members.map(m => {
                                                  
               if((filteredSearchItemFULL[r].displayValue === m.county) || (filteredSearchItemFULL[r].displayValue === m.city) || (filteredSearchItemFULL[r].displayValue === m.township)){
                                                  
                  elements = {
                      ...filteredSearchItemFULL[[(filteredSearchItemFULL[r].displayValue === m.county) || (filteredSearchItemFULL[r].displayValue === m.city) || (filteredSearchItemFULL[r].displayValue === m.township) ? r : null]],
                      members: [(filteredSearchItemFULL[r].displayValue === m.county) || (filteredSearchItemFULL[r].displayValue === m.city) || (filteredSearchItemFULL[r].displayValue === m.township) ? m : null]
                      }
                      
                                                      
                  pushEl.push(elements)
              }
          })
             
          }
                                                  
                                                  
      // -------------------unutar pushEl je onaj broj arraya kolko ima i clanova u razlicitim podrucjima i problem je sta svaki array ima unutar sebe potpuni broj sveukupnih podrucja i onda pushElClean sve njih stavlja u jedan veliki array 
                                                  
                                                  
        let merged = [];
        let mapa 
                                                  
        for(let key = 0; key < pushEl.length; key++){
                                                  
          mapa = pushEl.map(i => {
              return merged.push({
                  ...(pushEl[key].members.length > 0) ? pushEl[key] : null,
                  members: (pushEl[key].members.length > 0) ? pushEl[key].members.concat(i.members) : null
              })
          })
        }
                                                  
        let result = [];
        pushEl.forEach(function (a) {
          if (!this[a.displayValue]) {
              this[a.displayValue] = { displayValue: a.displayValue, id: a.id, members: a.members };
              result.push(this[a.displayValue]);
          }
          this[a.displayValue].members = this[a.displayValue].members !== a.members ? this[a.displayValue].members.concat(a.members) : this[a.displayValue].members;
          }, Object.create(null));
                                                  
                                                  

            
                        // ------------------- sada se taj veliki array smanjuje i otklanjaju se svi oni koji se poklapaju i ostaju samo ona podrucja koja imaju clanove 


      result = result.filter((thing, index, self) =>
      index === self.findIndex((t) => (
          t.displayValue === thing.displayValue && t.members.length > 0
      )))


      let pushElCleanId = []                       
                                    // -------------------pushElCleanId sadrzi sva ta podrucja sa clanovima i postavlja svakom podrucju novi valjani ID 

      for(let l = 0; l < result.length; l++){
        
        pushElCleanId.push({
            ...result[l],
            id: l
        });}

                                    // ------------------- filtrira sve ono kaj se upisuje u pretrazivac i onda stavlja u array
      let filteredAllSearchItem = []                                                                  
      if(this.state.inputOnChange !== ''){
               filteredAllSearchItem = pushElCleanId.filter(
                   (item) => {
                        return  item.displayValue.toLowerCase().indexOf(this.state.inputOnChange.toLowerCase()) !== -1 
   
              }) }

      let mapFilterItems = null
                                        // ------------------- ulazi u array koji ima clanove i onda ih mapira na nacin da prikazuje ona podrucja koja se poklapaju sa onim sto se upise i pored njih stavlja kolicinu clanova u tim podrucjima

      for(let l = 0; l < pushElCleanId.length; l++){

        mapFilterItems = filteredAllSearchItem.map(i => {

            return <p key={i.displayValue} onClick={(e) => this.valueSelected(e, i)}>
                      {i.displayValue}{' - ' + i.members.length}
                  </p>
        }) }

        

        const data = this.state.dataPie                             // data sa svim podacima za podrucja u kojima se nalaze clanovi

        let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }

        let maxValue = []                                                   // postavljanje random colora i memberlenght
        for(let key in data){
            maxValue.push({
                ...data[key],
                membersLenght: data[key].members.length,
                color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                
            })
        }

        let maxSum = []                                             // izdvajanje vrijednosti svih memberlenghta da se mogu usporedit i kasnije koristit za visinu i sirinu
        for(let key in maxValue){
            maxSum.push(maxValue[key].membersLenght
            )
        }

        let mix = Math.max.apply(Math, maxSum.map(function(o) { return o; }))           // vracanje najveceg memberlenghta




        let maxTrue = false                                             // postavljanje maksimalnog broja prikaza
        if(maxValue.length === 30){

            maxTrue = true
        } else{
            maxTrue = false
        }
                                                // mapiranje barova
        let mapData = maxValue.map(i => {
        return <div key={i.displayValue} className="AnalyticsBarItem" style={{minHeight: '60px', background: i.color, height: (i.members.length === mix) ? '550px' : (i.members.length * 100)/mix + '%', width: (i.members.length === mix) && (maxValue.length === 1) ? '600px' : 1100 / maxValue.length + 'px'}}><h4 >{i.members.length}</h4><div className="AnalyticsBarItemDelete" onClick={(e) => this.removeBar(e,i.num)}>X</div></div>
        })

                                            // mapiranje titlea
        let mapDataTitles = maxValue.map(i => {
            return <div style={{marginLeft: '8px'}} key={i.displayValue}>
                        <div className="AnalyticsBarDownTitleLine"></div>
                        <h5 style={{marginTop: 'auto', width: (i.members.length === mix) && (maxValue.length === 1) ? '600px' : 1100 / maxValue.length + 'px'}} key={i.displayValue}>{i.displayValue}</h5>
                    </div>
            })

                                                                    // random mijenjanje boje
        
                                                                    // data za postavljanje analize M-Ž
        let men = []
        let women = []

        for(let key in this.state.members) {
            if(this.state.members[key].sex === 'Muško'){
                men.push(this.state.members[key])
            } else {
                women.push(this.state.members[key])
            }
        }

        let sex = [
            {   
                "id": "Muškarci",
                "label": "Muškarci",
                "value": men.length,
                "color": color
            },
            {   
                "id": "Žene",
                "label": "Žene",
                "value": women.length,
                "color": color
            }
            ]

                                                                // data za postavljanje analize zaposlenja
        let zaposlenjeDa = []
        let zaposlenjeNe = []
        let zaposlenjeNone = []
    

        for(let key in this.state.members) {

            if(this.state.members[key].employment === 'DA'){

                zaposlenjeDa.push(this.state.members[key])

            } else if (this.state.members[key].employment === 'NE') {

                zaposlenjeNe.push(this.state.members[key])

            } else if (this.state.members[key].employment === '/') {

                zaposlenjeNone.push(this.state.members[key])
            }
        }
    
        let zaposlenje = [
            {   
                "id": "Zaposleni",
                "label": "Zaposleni",
                "value": zaposlenjeDa.length,
                "color": color
            },
            {   
                "id": "Nezaposleni",
                "label": "Nezaposleni",
                "value": zaposlenjeNe.length,
                "color": color
            },
            {   
                "id": "Neopredjeljeni",
                "label": "Neopredjeljeni",
                "value": zaposlenjeNone.length,
                "color": color
            }
            ]

        
                                // data za postavljanje analize prema strucnoj spremi
        

            let qualifications = this.state.fetchedQualifications[0]
            let qualificationsFetch = []
            let fetchFilterQual = []

            for (let key in qualifications) {
                qualificationsFetch.push(

                    qualifications[key]

                );

                fetchFilterQual= qualificationsFetch.filter(function (el) { // filtrira one koji nisu elementConfig
                    return el !== 'elementConfig' ;
                    });
            }

            let qualificationsNew = fetchFilterQual
            let qualificationsFetchNew = []
            let fetchFilterQualification = []
    
            for(let key in qualificationsNew){
    
                for(let num in qualificationsNew[key]){
    
                    qualificationsFetchNew.push(
                        qualificationsNew[key][num]
                    )
                    }
    
                    fetchFilterQualification = qualificationsFetchNew.filter(function (el) { // filtrira one koji nisu Odaberi
                        return el.displayValue !== 'Odaberi' ;
                        });
        
                }

                                // -------------------sada ulazi u clanove i strucne spreme i onda ih stavalja u members ako postoje clanovi sa odredenim spremama


        let pushElqualifications = []
        let elementsSP
                    
        for(let n = 0; n < this.state.members.length; n++){
        for(let r = 0; r < fetchFilterQualification.length; r++){
                                
            if((fetchFilterQualification[r].displayValue === this.state.members[n].qualifications)){
                                            
                            elementsSP = {
                                ...fetchFilterQualification[r],
                                members: [(fetchFilterQualification[r].displayValue === this.state.members[n].qualifications) ? this.state.members[n] : null]

                                }
                            
                                    pushElqualifications.push(elementsSP)
                                }}}
                                            
                                
                let filterMemberLenghtQualification = []
                for(let key in pushElqualifications){
        
                      if((pushElqualifications[key].members.length > 0) ){
        
                          filterMemberLenghtQualification.push(pushElqualifications[key])
        
                      }
                }
                                  
                                  
                let mergedQualification = [];
                let mapaQualification 
                                  
                for(let key = 0; key < filterMemberLenghtQualification.length; key++){
                                  
                    mapaQualification = filterMemberLenghtQualification.map(i => {
                        return mergedQualification.push({
                            ...(filterMemberLenghtQualification[key].members.length > 0) ? filterMemberLenghtQualification[key] : null,
                            members: (filterMemberLenghtQualification[key].members.length > 0) ? filterMemberLenghtQualification[key].members.concat(i.members) : null
                                                  })
                                              })
                                            }
                                  
                        let resultQualification = [];
                        filterMemberLenghtQualification.forEach(function (a) {
                            if (!this[a.displayValue]) {
                                this[a.displayValue] = { displayValue: a.displayValue, id: a.id, members: a.members };
                                    resultQualification.push(this[a.displayValue]);
                                              }
                                        this[a.displayValue].members = this[a.displayValue].members !== a.members ? this[a.displayValue].members.concat(a.members) : this[a.displayValue].members;
                                        }, Object.create(null));
                                  
                                  
                                              
                                                          // ------------------- sada se taj veliki array smanjuje i otklanjaju se svi oni koji se poklapaju i ostaju samo ona podrucja koja imaju clanove 
                                  
                                  
            resultQualification = resultQualification.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.displayValue === thing.displayValue && t.members.length > 0
                    )))
                                  
                                  
            let pushElCleanIdQualification  = []                       
                                                                      // -------------------pushElCleanIdQualification sadrzi sva ta podrucja sa clanovima i postavlja svakom podrucju novi valjani ID 
                                  
            for(let l = 0; l < resultQualification.length; l++){
                                          
            pushElCleanIdQualification.push({
                ...resultQualification[l],
                id: l
                });}
                    
                    
                    
                    
            let maxValueSP = []                                                   // postavljanje random colora i memberlenght
            for(let key in pushElCleanIdQualification){
                    maxValueSP.push({
                    ...pushElCleanIdQualification[key],
                        membersLenght: pushElCleanIdQualification[key].members.length,
                        color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
                                    
                                })
                            }
                    
        let maxSumSP = []                                             // izdvajanje vrijednosti svih memberlenghta da se mogu usporedit i kasnije koristit za visinu i sirinu
        for(let key in maxValueSP){
            maxSumSP.push(maxValueSP[key].membersLenght
            )
        }

        let mixSP = Math.max.apply(Math, maxSumSP.map(function(o) { return o; }))           // vracanje najveceg memberlenghta





                                                // mapiranje barova
        let mapDataSP = maxValueSP.map(i => {
        return <div key={i.displayValue} className="AnalyticsBarItem" style={{background: i.color, height: (i.members.length === mixSP) ? '550px' : (i.members.length * 100)/mixSP + '%', width: (i.members.length === mixSP) && (maxValueSP.length === 1) ? '600px' : 1100 / maxValueSP.length + 'px'}}><h4 >{i.members.length}</h4></div>
        })

                                            // mapiranje titlea
        let mapDataTitlesSP = maxValueSP.map(i => {
            return <div style={{marginLeft: '8px'}} key={i.displayValue}>
                        <div className="AnalyticsBarDownTitleLine"></div>
                        <h5 style={{marginTop: 'auto', width: (i.members.length === mixSP) && (maxValueSP.length === 1) ? '600px' : 1100 / maxValueSP.length + 'px'}} key={i.displayValue}>{i.displayValue}</h5>
                    </div>
            })           

                        
              
            
        return (
            <Aux>
                <div className="Main">
                    {item}
                </div>

                <div className="AnalyticsCountyPie" >

                    <div className="Analytics">
                        
                        <div className="AnalyticsSearch" style={{width: data.length ? '20%' : '100%'}}>
                            <input placeholder="Postavi analizu za područja..." onChange={(e) => this.inputOnChange(e)} value={this.state.inputOnChange} name="inputOnChange" style={{width: data.length ? '80%' : '20%', display: (maxTrue === true) ? 'none' : 'flex'}}/>
                            <div className="AnalyticsResults" style={{display: this.state.inputOnChange ? 'flex' : 'none', width: data.length ? '80%' : '20%'}}><div>{mapFilterItems}</div></div>
                        </div>

                        <div className="ResetBtn" onClick={this.resetBtn} style={{display: data.length ? 'flex' : 'none'}}>
                            Resetiraj
                        </div>

                    </div>

                    <div className="AnalyticsBar" style={{display: data.length ? 'flex' : 'none'}}>

                        <div className="AnalyticsBarWrapper">
                            <h3>Županije, gradovi i općine</h3>
                            <h5 style={{display: (maxTrue === true) ? 'block' : 'none', color: '#f36b6b'}}>Postigli ste maksimalan broj usporedbi.</h5>
                            <div className="AnalyticsBarUp">

                                <div className="AnalyticsBarUpWrapperLine">
                                    <div className="AnalyticsBarUpLine"></div>   
                                </div> 

                                <div className="AnalyticsBarUpWrapperBars">
                                        <div className="AnalyticsBarUpBars">
                                            {mapData}
                                        </div>
                                </div>

                            </div>

                            <div className="AnalyticsBarDown">
                                    <div className="AnalyticsBarDownLine"></div>       
                                    <div className="AnalyticsBarDownTitles">
                                        {mapDataTitles}
                                    </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="AnalyticsSexnEmployment">


                    <div className="AnalyticsTwoPieDiv">

                            <h3>Spol</h3>
                            
                            <ResponsivePie
                                data={sex}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.65}
                                padAngle={3}
                                cornerRadius={3}
                                colors={{ scheme: 'category10' }}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                radialLabelsSkipAngle={10}
                                radialLabelsTextXOffset={6}
                                radialLabelsTextColor="#333333"
                                radialLabelsLinkOffset={0}
                                radialLabelsLinkDiagonalLength={16}
                                radialLabelsLinkHorizontalLength={24}
                                radialLabelsLinkStrokeWidth={1}
                                radialLabelsLinkColor={{ from: 'color' }}
                                slicesLabelsSkipAngle={10}
                                slicesLabelsTextColor="#333333"
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                defs={[
                                    {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                                    }
                                ]}
                                legends={[
                                    {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                                }
                                            ]
                                        }
                                    ]}
                                />

                    </div>
                        
                    <div className="AnalyticsTwoPieDiv">

                            <h3>Zaposlenje</h3>

                            <ResponsivePie
                                data={zaposlenje}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.65}
                                padAngle={3}
                                cornerRadius={3}
                                colors={{ scheme: 'accent' }}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                radialLabelsSkipAngle={10}
                                radialLabelsTextXOffset={6}
                                radialLabelsTextColor="#333333"
                                radialLabelsLinkOffset={0}
                                radialLabelsLinkDiagonalLength={16}
                                radialLabelsLinkHorizontalLength={24}
                                radialLabelsLinkStrokeWidth={1}
                                radialLabelsLinkColor={{ from: 'color' }}
                                slicesLabelsSkipAngle={10}
                                slicesLabelsTextColor="#333333"
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                defs={[
                                    {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                                    }
                                ]}
                                legends={[
                                    {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                                }
                                            ]
                                        }
                                    ]}
                                />
                        </div>
                    
    
                </div>

                <div className="AnalyticsBar">

                        <div className="AnalyticsBarWrapper">

                            <h3>Stručna sprema</h3>

                            <div className="AnalyticsBarUp">

                                <div className="AnalyticsBarUpWrapperLine">
                                    <div className="AnalyticsBarUpLine"></div>   
                                </div> 

                                <div className="AnalyticsBarUpWrapperBars">
                                        <div className="AnalyticsBarUpBars">
                                            {mapDataSP}
                                        </div>
                                </div>

                            </div>

                            <div className="AnalyticsBarDown">
                                    <div className="AnalyticsBarDownLine"></div>       
                                    <div className="AnalyticsBarDownTitles">
                                        {mapDataTitlesSP}
                                    </div>
                            </div>

                        </div>
                </div>
                
                <Error
                    error={this.state.error}
                    errorHandler={this.errorHandler}
                />
            </Aux>
        );
    }

}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}


export default connect(mapStateToProps)(Main);