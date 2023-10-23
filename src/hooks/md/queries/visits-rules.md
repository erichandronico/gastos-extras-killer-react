#### Visits Rules desde FHO
```sql
SELECT 
    r.[id], 
    r.[id] as rule_id, 
    r.[name], 
    2 as type, -- type 2 visits rule
    r.[description], 
    r.[status], 
    r.[content_summary], 
    vr.[day], 
    vr.[week], 
    vr.[month]
FROM [HO_DATA].[dbo].[visits_rules] vr 
JOIN [HO_DATA].[dbo].[rules] r ON r.id = vr.id 
WHERE r.[status] > 0
```