import g_coBcrypt from "bcrypt"
import "dotenv/config"

export default async function(a_oCookies) {
	const l_coFilter = {}
	if (a_oCookies.m_sUsername) l_coFilter.username = a_oCookies.m_sUsername
	if (a_oCookies.m_sPassword) l_coFilter.password = await g_coBcrypt.hash(a_oCookies.m_sPassword, process.env.m_saltRounds)
	if (a_oCookies.m_sEmailAddress) l_coFilter["Email address"] = a_oCookies.m_sEmailAddress
	if (a_oCookies.m_sMaximumNumberOfActiveEvents) l_coFilter["Maximum number of active events"] = BigInt(a_oCookies.m_sMaximumNumberOfActiveEvents)
	if (a_oCookies.m_sMaximumNumberOfInvitationsToAnEvent) l_coFilter["Maximum number of invitations to an event"] = BigInt(a_oCookies.m_sMaximumNumberOfInvitationsToAnEvent)
	if (a_oCookies.m_sAdmin) l_coFilter.admin = Boolean(a_oCookies.m_sAdmin)
	return l_coFilter
}