import { Box, Typography } from '@mui/material';
import React from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
function RoadMap({mode}) {
  return (
    <Box sx={{mt:"100px"}}>
      <Typography variant='h2' sx={{textAlign:"center"}}>Road Map</Typography>
    <VerticalTimeline>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{ background:mode? "#ffff ": '#232a2d', color:mode?"#000" :'#ffff' }}
      // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      date=" June 18, 2024"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<WorkIcon />}
    >
      <Typography variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Phase 1</Typography>
      <Typography variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Launch and Initial Operations
      June 18, 2024</Typography>
    <ul>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>   Token Launch: Official
        launch of KAFA Token</Typography>
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}> Initial Operations: Begin
operations with 10,000
coffee trees</Typography>
     
      </li>
      <li>
        <Typography variant='h5'sx={{ color:mode?"#000" :'#ffff'}}>Airdrop Campaign: Initiate
airdrop campaign to early
adopters and community
supporters</Typography>

      </li>
    </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      date="Q3 2024"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<WorkIcon />}
    >
      <Typography variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Phase 2 Q3 2024</Typography>
      <Typography  variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Community Bilding and Expansion
      </Typography>
      <ul>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>Community Engagement: Conduct regular
AMA (Ask Me Anything) sessions to
engage with the community</Typography>


      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>Partnership Announcements: Announce
strategic partnerships with coffee
distributors and eco-friendly
organizations</Typography>
    
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>Staking Platform: Launch staking platform
allowing users to stake KAFA tokens and
earn rewards.[ScaleUp.Exchange]</Typography>
  
      </li>
    </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      date="Q4 2024"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<WorkIcon />}
    >
      <Typography variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Q4 2024
      </Typography>
      {/* <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4> */}
      <ul>
      <li>
        <Typography variant='h5'sx={{ color:mode?"#000" :'#ffff'}}> Marketplace Launch: Launch an online marketplace
        for coffee products.[KaffeeAroma.com]</Typography>
     
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>Mobile App Development: Begin development of a
mobile app for easier access to KAFA Token
services.</Typography>

      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}> nvironmental Impact Report: Publish the first
environmental impact report on the benefits of
KAFA’s coffee tree operations </Typography>

      </li>
    </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      date="Q1 2025"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<WorkIcon />}
    >
      <Typography   variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Phase 3 Q1 2025
      </Typography>
      <Typography variant='h4' sx={{ color:mode?"#000" :'#ffff'}}>Scaling and Ecosystem Integration</Typography>
      <ul>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}> LIncrease Coffee Tree Count: Expand operations to include
        an additional 20,000 coffee trees.</Typography>
     
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>    International Expansion: Start exploring opportunities for
        international expansion and partnerships.</Typography>
  
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>      Advanced Features: Introduce advanced features in the
mobile app, including real-time tracking of coffee tree
growth and health.</Typography>


      </li>
    </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
      className="vertical-timeline-element--education"
      contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      date="Q2 2025"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<SchoolIcon />}
    >
      <Typography variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Q2 2025</Typography>
     
      <ul>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}> Governance Model: Implement a
        decentralized governance model</Typography>
     
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}> allowing token holders to vote on key
        decisions.</Typography>
     
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>      Educational Programs: Launch
educational programs about
sustainable agriculture and blockchain
technology.</Typography>

      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>Reward Programs: Initiate reward
programs for community members
5 actively contributing to the ecosystem.
.</Typography>

      </li>
    </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
      className="vertical-timeline-element--education"
      contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      date="2025"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<SchoolIcon />}
    >
      <Typography variant='h3'sx={{ color:mode?"#000" :'#ffff'}}>Phase 4
      </Typography>
      <Typography variant='h4'sx={{ color:mode?"#000" :'#ffff'}}>Long-Term Sustainability and Innovation</Typography>
      <ul>
      <li>
<Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>2025 and Beyond</Typography>
      
      </li>
      <li>
        <Typography variant='h5'sx={{ color:mode?"#000" :'#ffff'}}> Research and Development: Invest in R&D for innovative
        agricultural techniques and blockchain solutions</Typography>

      </li>
      <li>
        <Typography variant='h5'sx={{ color:mode?"#000" :'#ffff'}}> Global Reach: Aim to establish KAFA Token as a global standard
        for eco-friendly agriculture and sustainable farming practices.</Typography>
 
      </li>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>   Continuous Improvement: Continuously improve operations,
technology, and community engagement to ensure long-term
success and environmental impact.</Typography>
   
.
      </li>
    </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
    contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      className="vertical-timeline-element--education"
      // date="2002 - 2006"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<SchoolIcon />}
    >
      <Typography  variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Operational performance</Typography>
      {/* <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4> */}
      <ul>
        <li>
          <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>This roadmap provides a structured plan for the development
and expansion of KAFA_NETWORK (KAFA) Token. It outlines
key milestones and goals to ensure a successful launch and
sustainable growth.</Typography>


        </li>
      </ul>
    </VerticalTimelineElement>
    <VerticalTimelineElement
    contentStyle={{ background:mode? "#ffff ":  '#232a2d', color:mode?"#000" :'#ffff' }}
      className="vertical-timeline-element--work"
      // date="Q3 2024"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      // icon={<WorkIcon />}
    >
      <Typography  variant='h3' sx={{ color:mode?"#000" :'#ffff'}}>Vision</Typography>
      {/* <h4 className="vertical-timeline-element-subtitle">Community Bilding and Expansion
      </h4> */}
      <ul>
      <li>
        <Typography variant='h5' sx={{ color:mode?"#000" :'#ffff'}}>[ The goal is to plant 1,000,000 coffee trees and 1,000,000 olive trees in these
new regions to diversify the global supply, support local communities, and
promote environmental conservation ]</Typography>
      


      </li>


    </ul>
    </VerticalTimelineElement>
    
  </VerticalTimeline>
  </Box>
  )
}

export default RoadMap