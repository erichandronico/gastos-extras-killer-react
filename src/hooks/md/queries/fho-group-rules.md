#### Group Rules FHO => FuelOnet Prime
```sql
SELECT [id],
    [name],
    [description],
    ISNULL([content_summary], '-') [content_summary],
    [limits] [iLimits],
    [visits] [iVisits],
    [time] [iTime],
    [fuel] [iFuel],
    [cluster]
FROM [HO_DATA].[dbo].[group_rules] 
```