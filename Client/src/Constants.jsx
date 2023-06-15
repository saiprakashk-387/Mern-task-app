export const parseDate = (val) => {
  let dt = new Date(val);
  let n = dt.toLocaleDateString();
  return n
}

export const mainCategoryCourseList = [
  {
    name: "DataBase",
    value: 'database'
  },
  {
    name: "FrontEnd",
    value: 'frontend'
  },
  {
    name: "BackEnd",
    value: 'backend'
  },
  {
    name: "Cloud",
    value: 'cloud'
  }
]

export const subCategoryList = [
[
      {
        name: "MongoDB",
        value: 'mongodb'
      },
      {
        name: "SQL",
        value: 'sql'
      },
    ]
  ,
 [
      {
        name: "React_JS",
        value: 'reactjs'
      },
      {
        name: "Next_Js",
        value: 'nextjs'
      },
    ],
  
 [
      {
        name: "Node_Js",
        value: 'nodejs'
      },
      {
        name: "Java",
        value: 'java'
      },
    ]  ,
  [
      {
        name: "AWS",
        value: 'aws'
      },
      {
        name: "Azure",
        value: 'azure'
      },
    ]
  
]