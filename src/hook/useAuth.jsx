import {useContext} from 'react'
import AuthContext from '../context/authContextImport'

export const useAuth =() => {
    const {
        user, inUser, signIn, logout, addEmployee, addScale,
        findTeams, teams, findRegions, regions, findEmployees, employees, 
        findScales, scales, admin, inAdmin, adminSignIn, allEmployees,allSectors,
        addSector, updateScale, addTurn, addAdmin, deleteEmployee, getAllEmployees,
        findTurns, turns, updateAdmin, actives, findActives, deleteSector, updateSector,
        forgotPassword, codeVerify, resetPassword, scalesEmployees, updateTurn, sectorsEmployees,
        addTeam, updateEmployee, findAllTeams, allTeams,
        addScaleAdmin, updateScaleAdmin, findAllScales, allScales,
        addTurnAdmin, updateTurnAdmin, findAllTurns, allTurns,
        findAllRegions, allRegions, holidays,
        addEditdays, findEditdays, editdays, confirms, createReport, createReportTeam, createReportEmployee
    } = useContext(AuthContext);

    return{
        user,
        signIn,
        logout,
        inUser,
        addEmployee,
        addScale,
        addTurn,
        updateScale,
        addAdmin,
        deleteEmployee,
        getAllEmployees,
        updateAdmin,
        deleteSector, updateSector,
        forgotPassword, codeVerify, resetPassword,
        scalesEmployees, sectorsEmployees,
        updateTurn,
        addTeam,
        updateEmployee,
        addEditdays,
        confirms,
        createReport, createReportTeam, createReportEmployee,
        
        findTeams,
        teams,
        findRegions,
        regions,
        findEmployees,
        employees,
        findScales,
        scales,
        findTurns,
        turns,
        findActives,
        actives,
        findEditdays,
        editdays,

        admin,
        inAdmin,
        adminSignIn,
        addSector, addTurnAdmin, updateTurnAdmin, addScaleAdmin, updateScaleAdmin,
        allEmployees,            
        allSectors,      
        findAllTeams,
        allTeams,
        findAllScales, 
        allScales,
        findAllTurns, 
        allTurns,
        findAllRegions,
        allRegions,
        holidays
        
    }
}