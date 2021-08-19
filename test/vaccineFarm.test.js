const { assert,expect } = require("chai");
const VaccineFarm = artifacts.require("VaccineFarm");
require("chai")
.use(require('chai-as-promised'))
.should()

contract("VaccineFarm",([first,second,...rest])=>{
    let vaccineFarm, res;

    before(async ()=>{
        vaccineFarm = await VaccineFarm.new();
    });

    describe("The VaccineFarm is deployed",async ()=>{
        
        it("has a name", async ()=>{
            let name = await vaccineFarm.name();
            assert.equal(name,"VaccineFarm");
        });

    });

    describe("States can intract with central", async ()=>{

        it("can register", async ()=>{
            await vaccineFarm.registerNewState("State Name","Password");
        });

        it("new states ha been added to state list", async ()=>{
            res =  await vaccineFarm.getTotalStates();
            expect(res).to.be.an('array');
        });

    });

    describe("Can request for vaccine", async ()=>{
        
        it("can add vaccine to vaccineIssueQues", async ()=>{
            await vaccineFarm.addToVaccineIssueQue(res[0],10); 
        });

        it("check vaccine is added to que", async ()=>{
            let newResponse =  await vaccineFarm.getVaccineIssueQueToState(res[0]); 
            console.log(newResponse.toString());
       });
        
    });

    describe("Can issue vaccine", async ()=>{

         it("can issue vaccine to states", async ()=>{
             await vaccineFarm.issueVaccine(res[0],10);
            const result = await vaccineFarm.totalVaccineIssued(res[0]);
            assert.equal(result,10); 
        });

    });

});