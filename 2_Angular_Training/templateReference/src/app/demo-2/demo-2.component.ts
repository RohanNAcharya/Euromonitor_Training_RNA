import { Component } from '@angular/core';
import { idol } from './idols';

@Component({
  selector: 'app-demo-2',
  templateUrl: './demo-2.component.html',
  styleUrl: './demo-2.component.css'
})
export class Demo2Component {
  selectedIdol!: idol;

  idols = [
    {
        "name": "Chaeyoung",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 22,
        "debutYear": 2015
    },
    {
        "name": "Dahyun",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 24,
        "debutYear": 2015
    },
    {
        "name": "Jeongyeon",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 26,
        "debutYear": 2015
    },
    {
        "name": "Jennie",
        "groupName": "BLACKPINK",
        "company": "YG Entertainment",
        "age": 27,
        "debutYear": 2016
    },
    {
        "name": "Jihyo",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 25,
        "debutYear": 2015
    },
    {
        "name": "Jin",
        "groupName": "BTS",
        "company": "Big Hit Entertainment",
        "age": 29,
        "debutYear": 2013
    },
    {
        "name": "Jisoo",
        "groupName": "BLACKPINK",
        "company": "YG Entertainment",
        "age": 26,
        "debutYear": 2016
    },
    {
        "name": "Jungkook",
        "groupName": "BTS",
        "company": "Big Hit Entertainment",
        "age": 24,
        "debutYear": 2013
    },
    {
        "name": "Lisa",
        "groupName": "BLACKPINK",
        "company": "YG Entertainment",
        "age": 25,
        "debutYear": 2016
    },
    {
        "name": "Mina",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 25,
        "debutYear": 2015
    },
    {
        "name": "Momo",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 25,
        "debutYear": 2015
    },
    {
        "name": "Nayeon",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 26,
        "debutYear": 2015
    },
    {
        "name": "RM",
        "groupName": "BTS",
        "company": "Big Hit Entertainment",
        "age": 28,
        "debutYear": 2013
    },
    {
        "name": "Rosé",
        "groupName": "BLACKPINK",
        "company": "YG Entertainment",
        "age": 25,
        "debutYear": 2016
    },
    {
        "name": "Sana",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 25,
        "debutYear": 2015
    },
    {
        "name": "Suga",
        "groupName": "BTS",
        "company": "Big Hit Entertainment",
        "age": 29,
        "debutYear": 2013
    },
    {
        "name": "Tzuyu",
        "groupName": "TWICE",
        "company": "JYP Entertainment",
        "age": 22,
        "debutYear": 2015
    },
    {
        "name": "V",
        "groupName": "BTS",
        "company": "Big Hit Entertainment",
        "age": 26,
        "debutYear": 2013
    },
    {
        "name": "Jimin",
        "groupName": "BTS",
        "company": "Big Hit Entertainment",
        "age": 26,
        "debutYear": 2013
    }
  ]

  filteredGroup:idol[]= [];

  setFilteredGroup(groupName:HTMLInputElement){
    this.filteredGroup = this.idols.filter(idol => idol.groupName.toLowerCase() === groupName.value.toLowerCase());
  }

}
