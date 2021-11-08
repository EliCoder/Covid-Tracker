import { Card, CardContent, Typography} from '@material-ui/core'

const InfoBox = ({title, cases, total}) => {
    return (
        <Card className="InfoBox">
         <CardContent>
             {/* Title i.e, coronavirus cases */}
          <Typography className="InfoBox__title" color="textSecondary">
            {title}
          </Typography>

          {/*120K Number of cases */}
          <h2 className="InfoBox__cases">
            {cases}
          </h2>
          {/* 1.2M total */}
          <Typography className="InfoBox__total" color="textSecondary" >
              {total}
          </Typography>
         </CardContent>
        </Card>
    ) 
}

export default InfoBox
