#### Station Cluster desde FHO

```sql
;WITH cluster_rules AS (
      SELECT r.[id],
            cr.[type],                -- 1 allow, 2 deny?? No es list-_Type?
            r.[name],
            r.[description]
        FROM [HO_DATA].[dbo].[cluster_rules] cr
        JOIN [HO_DATA].[dbo].[rules] r on r.rule_id = cr.id
        JOIN  [HO_DATA].[dbo].[cluster_rule_list] crid on crid.cluster_rule_id = cr.id
        JOIN  [HO_DATA].[dbo].[station_clusters] sc on sc.id = crid.cluster_id
        WHERE r.status > 0
)

SELECT
    [id],
    [type],                -- 1 allow, 2 deny?? No es list-_Type?
    [name],
    [description],
    CONCAT('[', STUFF(
           (SELECT ', "' + name + '"'
            FROM cluster_rules
            FOR XML PATH('')), 1, 2, ''), ']') AS clusters_name,
    (select id, name from  cluster_rules for JSON PATH  ) as clusters
  FROM cluster_rules
```