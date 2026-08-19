import { useState, useEffect } from "react";
import api from '../api/api';
import AuthContext from "./authContextImport";

import { addEmployee, findEmployees, findAllEmployees, findActives, contEmployeesScale, contEmployeesSector, updateEmployee, confirmEmployees, createReportEmployee } from "../services/employeesServices";
import { addScale, findScales, updateScale, updateScaleAdmin, addScaleAdmin, findAllScales } from "../services/scalesServices";
import { findAllSectors, addSector, deleteSector, updateSector } from "../services/sectorsServices";
import { addAdmin, deleteEmployee, updateAdmin, findEditdays, addEditdays, createReport } from "../services/adminsServices"
import { findTeams, addTeam, findAllTeams, createReportTeam } from '../services/teamsServices'
import { findRegions, findAllRegions} from '../services/regionsServices'
import { findTurns, addTurn, updateTurn, updateTurnAdmin, addTurnAdmin, findAllTurns } from '../services/turnsServices'
import { forgotPassword, codeVerify, resetPassword } from '../services/sessionServices'
export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [teams, setTeams] = useState([])
  const [regions, setRegions] = useState([])
  const [employees, setEmployees] = useState([])
  const [scales, setScales] = useState([])
  const [allEmployees, setAllEmployees] = useState([])
  const [allSectors, setAllSectors] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const [allScales, setAllScales] = useState([])
  const [allTurns, setAllTurns] = useState([])
  const [allRegions, setAllRegions] = useState([])
  const [turns, setTurns] = useState([])
  const [actives, setActives] = useState([])
  const [scalesEmployees, setScalesEmployees] = useState([])
  const [sectorsEmployees, setSectorsEmployees] = useState([])

  const [editdays, setEditdays] = useState([])
  const [confirms, setConfirms] = useState([])

  const signIn = async (registration, senha) => {
    try {
      if (!registration || !senha) {
        const erro = 'Preencha todos os campos'
        return { result: null, error: erro };
      }
      if (!/^\d+$/.test(registration)) {
        const erro = 'Creedenciais Invalidas'
        return { result: null, error: erro }
      }
      const { data } = await api.post('/loginAdm', {
        registration,
        senha
      })

      if (data?.token) {
        localStorage.setItem('authToken', data.token);
        setUser(data);
        localStorage.setItem('user_data', JSON.stringify(data));
        return { result: data, error: null };
      }
      const sucess = 'Login realizado com sucesso'
      return { result: data, error: null, sucess: sucess };
    } catch (error) {
      const erro = error.response?.data?.message 
      console.error('Erro ao fazer login: ', erro)
      return { result: null, error: erro, sucess: null }
    }
  };
  const logout = async () => {
    setUser(null)
    setAdmin(null)
    localStorage.removeItem('user_data')
    localStorage.removeItem('authToken')
    localStorage.removeItem('admin_data')

  };
  const adminSignIn = async (registration, password) => {
    try {
      const { data } = await api.post('/loginMaster', {
        registration,
        password
      })
      if (data?.token) {
        setAdmin(data);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('admin_data', JSON.stringify(data));
        return {result: data, error: null};
      }
      const sucess = 'Login realizado com sucesso'
      return { result: data, error: null, sucess: sucess };
    } catch (error) {
      const erro = error?.response?.data?.message 
      console.error("Erro ao fazer login como admin", erro)
      return { result: null, error: erro, sucess: null}
    }
  };

  const getAllEmployees = async () => {
    const res = await findAllEmployees();
    setAllEmployees(res);
  };
  const getAllSectors = async() => {
    const res = await findAllSectors();
    setAllSectors(res)
  }

  const handleDelEmployee = async (registration) => {
    const res = await deleteEmployee(registration);
    if (res.result) {
      await getAllEmployees();
    }
    return res;
  };
  const handleDelSector = async(id) => {
    const res = await deleteSector(id)
    if(res.result) {
      await getAllSectors();
      await getAllEmployees();
    }
    return res
  }
  


  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user_data');
      if (typeof storedUser === 'string' && storedUser.trim() !== '') {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Se o JSON estiver corrompido, limpe o localStorage
          console.error("Erro ao fazer parse do JSON do usuário:", e);
          localStorage.removeItem('user_data');
        }
      }

      setLoading(false);

    };
    loadUser();


  }, []);

  useEffect(() => {
    const loadAdmin = async () => {
      const storedAdmin = localStorage.getItem('admin_data');
      if (typeof storedAdmin === 'string' && storedAdmin.trim() !== '') {
        try {
          setAdmin(JSON.parse(storedAdmin));
        } catch (e) {
          // Se o JSON estiver corrompido, limpe o localStorage
          console.error("Erro ao fazer parse do JSON do usuário:", e);
          localStorage.removeItem('admin_data');
        }
      }

      setLoading(false);

    };
    loadAdmin();

  }, []);

  useEffect(() => {
    if (user?.employee?.registration) {
      (async () => {
        const today = new Date().toISOString().split('T')[0]
        setActives(await findActives(user, today));
        setTeams(await findTeams(user));
        setRegions(await findRegions(user));
        setTurns(await findTurns(user));
        setEmployees(await findEmployees(user));
        setScales(await findScales(user));
        setScalesEmployees(await contEmployeesScale(user));
        setEditdays(await findEditdays());
        setConfirms(await confirmEmployees(user));
      })();
    }
  }, [user])

  useEffect(() => {
    if (admin) {
      (async () => {
        setAllSectors(await findAllSectors());
        setAllEmployees(await findAllEmployees());
        setAllTeams(await findAllTeams());
        setAllScales(await findAllScales());
        setAllTurns(await findAllTurns());
        setAllRegions(await findAllRegions());
        setSectorsEmployees(await contEmployeesSector());
        setEditdays(await findEditdays());
      })();
    }
  }, [admin])



  const [token, setToken] = useState(false);

  function isTokenExpired(token) {
    try {
      const [, payload] = token.split('.');
      const { exp } = JSON.parse(atob(payload));
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      setUser(null);
      setAdmin(null);
      setToken(true);
      localStorage.removeItem('user_data');
      localStorage.removeItem('authToken');
      localStorage.removeItem('admin_data');
    }
  }, []);

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 2000); // 2 segundos para mostrar a message
      return () => clearTimeout(timer);
    }
  }, [token]);

  if (token) {
    setTimeout(() => window.location.href = '/', 2000);
    return <p className="loading-text">Sua sessão expirou. Redirecionando para o login...</p>
  }



  if (loading) {
    return <p className="loading-text">Carregando...</p>
  };

  return (
    <AuthContext.Provider value={{
      user,
      inUser: !!user,
      signIn, logout,
      addEmployee,
      addScale, addScaleAdmin,
      addTurn, addTurnAdmin,
      updateScale, updateScaleAdmin,
      addAdmin,
      deleteEmployee: handleDelEmployee,
      getAllEmployees,
      updateAdmin,
      addTeam,
      deleteSector: handleDelSector,
      updateSector,
      forgotPassword, codeVerify, resetPassword,
      scalesEmployees, sectorsEmployees,
      updateTurn, updateTurnAdmin,
      updateEmployee,
      addEditdays,
      confirms,
      createReport,
      createReportTeam,
      createReportEmployee,

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
      inAdmin: !!admin,
      adminSignIn,
      addSector,

      findAllEmployees,
      allEmployees,
      findAllSectors,
      allSectors,
      findAllTeams,
      allTeams,
      findAllScales,
      allScales,
      findAllTurns,
      allTurns,
      findAllRegions,
      allRegions,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
