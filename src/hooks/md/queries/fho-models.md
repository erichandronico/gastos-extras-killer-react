#### Models FHO => FuelOnet Prime
```sql
SELECT m.id
      ,m.[name]
      ,m.[description]
      ,m.[status]
      ,c.id [company_id]
      ,c.[name] as company_name
      , class.id class_id
      ,class.[description] class_description
      ,m.[capacity]
      ,m.[consumption]
      ,m.[consumption2]
  FROM [HO_DATA].[dbo].[model] m    
  LEFT OUTER JOIN [HO_DATA].[dbo].[company] c on c.id = m.company_id
  LEFT OUTER JOIN [HO_DATA].[dbo].[equipment_class] class on class.id = m.class_id
  WHERE m.status > 0
```