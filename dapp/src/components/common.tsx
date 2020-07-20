import React from "react"
import styled, { css } from "styled-components"
import isFuture from "date-fns/isFuture"
import { getProposalEndDate } from "../utils"
import GithubMark from "../images/github-mark.svg"

type PillProps = {
  size: "sm" | "md"
}

export const Pill = styled.div<PillProps>`
  font-size: 0.75rem;
  font-weight: 400;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  color: var(--color-1);
  background-color: var(--color-6);
  ${props =>
    props.size === "sm" &&
    css`
      font-size: 0.75rem;
      width: 20px;
      height: 20px;
    `}
  ${props =>
    props.size === "md" &&
    css`
      font-size: 1.125rem;
      width: 24px;
      height: 24px;
    `}
`

export const Section = styled.h3`
  display: flex;
  font-size: 1rem;
  text-transform: uppercase;
  margin-top: 40px;
  align-items: center;

  ${Pill} {
    margin-left: 0.625rem;
  }

  .right {
    flex: 1;
    text-align: right;
  }
`

const Badge = styled.div`
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: 10px;
  padding: 0.3125rem 0.625rem;
`
export const InfoBadge = styled(Badge)`
  color: var(--color-3);
  background-color: var(--color-4);
`

export const InvertedInfoBadge = styled(Badge)`
  color: #fff;
  background-color: var(--color-3);
`

export const PrimaryBadge = styled(Badge)`
  color: #fff;
  background-color: var(--color-5);
`

export const DangerBadge = styled(Badge)`
  color: #fff;
  background-color: var(--color-7);
`
export const Text = styled.span`
  font-family: Montserrat, sans-serif;
`

export const proposalStatusToBadge = (proposal, systemInfo) => {
  if (proposal.status === "COMPLETED") {
    return <PrimaryBadge>Completed</PrimaryBadge>
  }

  if (proposal.status === "REJECTED") {
    return <DangerBadge>Rejected</DangerBadge>
  }

  if (proposal.status === "PROPOSED") {
    const inVotingPeriod = isFuture(
      getProposalEndDate(proposal.createdAt, systemInfo.votingPhaseDuration)
    )

    return inVotingPeriod ? (
      <InfoBadge>In Voting</InfoBadge>
    ) : (
      <DangerBadge>Expired</DangerBadge>
    )
  }

  return null
}

export const requestStatusToBadge = status => {
  if (status === "proposed") {
    return <InfoBadge>Proposed</InfoBadge>
  }

  if (status === "completed") {
    return <PrimaryBadge>Completed</PrimaryBadge>
  }

  if (status === "deprecated") {
    return <DangerBadge>Deprecated</DangerBadge>
  }

  return null
}

const GithubLinkWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }

  a {
    text-decoration: underline;
  }
`
export const GithubLink = ({ text, href }) => {
  return (
    <GithubLinkWrapper>
      <GithubMark />
      <a href={href} target="blank">
        {text}
      </a>
    </GithubLinkWrapper>
  )
}
